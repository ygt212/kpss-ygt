import { useMemo } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import turkeyData from '../data/turkey.json';

interface TurkeyMapProps {
  interactiveIds?: string[];
  foundIds?: string[];
  highlightIds?: string[]; // IDs of provinces to highlight (e.g. hovered region on mini-map)
  hintIds?: string[]; // IDs of provinces to show as hints (yellow)
  focusIds?: string[]; // IDs of provinces to compute the bounding box for zooming
  onProvinceClick?: (id: string) => void;
  width?: number;
  height?: number;
  renderOverlay?: (projection: any) => React.ReactNode;
}

// Define the type for the geojson features
interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  properties: {
    name: string;
    number: number;
  };
}

export function TurkeyMap({
  interactiveIds = [], 
  foundIds = [], 
  highlightIds = [],
  hintIds = [],
  focusIds = [],
  onProvinceClick,
  width = 800,
  height = 400,
  renderOverlay
}: TurkeyMapProps) {
  // Serialize focusIds for stable memo dependency (the array is a new reference each render)
  const focusIdsKey = JSON.stringify(focusIds);

  const { pathGenerator, features, transformStyle, projection } = useMemo(() => {
    // Cast data safely
    const dataFeatures = (turkeyData as any).features as Feature[];

    // Create a fixed projection fitted to the WHOLE Turkey GeoJSON data
    const projection = geoMercator().fitSize([width, height], turkeyData as any);
    const pathGenerator = geoPath().projection(projection);

    // Compute bounding box and transform if focusIds are provided
    let transformStyle = {
      transform: 'translate(0px, 0px) scale(1)',
      transformOrigin: '0 0',
      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    if (focusIds.length > 0) {
      const focusFeatures = dataFeatures.filter(f => {
        const id = f.properties.number.toString().padStart(2, '0');
        return focusIds.includes(id);
      });

      if (focusFeatures.length > 0) {
        // Create a feature collection out of focused features to get their combined bounds
        const focusCollection = {
          type: "FeatureCollection",
          features: focusFeatures
        };
        const bounds = pathGenerator.bounds(focusCollection as any);
        const bx0 = bounds[0][0];
        const by0 = bounds[0][1];
        const bx1 = bounds[1][0];
        const by1 = bounds[1][1];

        const bWidth = bx1 - bx0;
        const bHeight = by1 - by0;
        const bcx = (bx0 + bx1) / 2;
        const bcy = (by0 + by1) / 2;

        // Calculate scale to fit the bounds into the viewport, with 25% padding
        // Math.min is used to fit both width and height. Limit maximum zoom to avoid overly zooming small regions.
        let scale = Math.min(width / bWidth, height / bHeight) * 0.75;
        // Optional: limit maximum scale so tiny regions don't blow up too much
        scale = Math.min(scale, 4);

        // Calculate translation to center the bounds
        const translateX = (width / 2) - (bcx * scale);
        const translateY = (height / 2) - (bcy * scale);

        transformStyle = {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformOrigin: '0 0',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        };
      }
    }

    return { pathGenerator, features: dataFeatures, transformStyle, projection };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, focusIdsKey]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full object-contain"
        preserveAspectRatio="xMidYMid meet"
      >
        <g style={transformStyle} className="stroke-white dark:stroke-slate-700" strokeWidth={focusIds.length > 0 ? 0.5 : 1} strokeLinejoin="round" strokeLinecap="round">
          {features.map((feature) => {
            const id = feature.properties.number.toString().padStart(2, '0');
            const isInteractive = interactiveIds.includes(id);
            const isFound = foundIds.includes(id);
            const d = pathGenerator(feature as any) || '';
            const isHighlighted = highlightIds.includes(id);
            const isHint = hintIds.includes(id);

            // Determine classes based on state
            let fillClass = 'fill-slate-200 dark:fill-slate-900 opacity-100'; // Dimmed by default
            let cursorClass = 'cursor-default';
            let pointerEvents = 'pointer-events-none';

            if (isFound) {
              fillClass = 'fill-green-500 dark:fill-green-600 opacity-100';
              cursorClass = 'cursor-default';
              pointerEvents = 'pointer-events-none';
            } else if (isHint) {
              fillClass = 'fill-yellow-400 dark:fill-yellow-500 opacity-100';
              cursorClass = 'cursor-pointer';
              pointerEvents = 'pointer-events-auto';
            } else if (isHighlighted) {
              fillClass = 'fill-indigo-400 dark:fill-indigo-500 opacity-100';
              cursorClass = 'cursor-default';
              pointerEvents = 'pointer-events-none';
            } else if (isInteractive) {
              fillClass = 'fill-slate-400 dark:fill-slate-800 hover:fill-slate-500 dark:hover:fill-slate-700 opacity-100';
              pointerEvents = 'pointer-events-auto';
              cursorClass = 'cursor-pointer';
            }

            return (
              <path
                key={id}
                id={`province-${id}`}
                d={d}
                className={`${fillClass} ${cursorClass} ${pointerEvents} transition-all duration-300`}
                onClick={() => {
                  if (isInteractive && !isFound) {
                    onProvinceClick?.(id);
                  }
                }}
              />
            );
          })}
          {renderOverlay && renderOverlay(projection)}
        </g>
      </svg>
    </div>
  );
}

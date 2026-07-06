interface MarkerItem {
  id: string;
  name: string;
  markerLng: number;
  markerLat: number;
}

interface MapMarkersProps {
  projection: any;
  items: MarkerItem[];
  onMarkerClick?: (id: string) => void;
  // Placeholders for future Phase 4 logic
  foundIds?: string[];
  hintIds?: string[];
}

export function MapMarkers({ 
  projection, 
  items, 
  onMarkerClick,
  foundIds = [],
  hintIds = []
}: MapMarkersProps) {
  return (
    <>
      {items.map((item) => {
        // Project coordinates
        const projected = projection([item.markerLng, item.markerLat]);
        if (!projected) return null;
        
        const [x, y] = projected;
        
        const isFound = foundIds.includes(item.id);
        const isHint = hintIds.includes(item.id);

        // Default: cyan. Found: green. Hint: yellow.
        let colorClass = "fill-teal-500 dark:fill-teal-600";
        if (isFound) colorClass = "fill-green-500 dark:fill-green-600";
        else if (isHint) colorClass = "fill-yellow-400 dark:fill-yellow-500";

        return (
          <g 
            key={item.id} 
            transform={`translate(${x}, ${y})`}
            className={`cursor-pointer group ${isFound ? 'pointer-events-none' : 'pointer-events-auto'}`}
            onClick={(e) => {
              // Prevent province click from firing if they overlap
              e.stopPropagation();
              onMarkerClick?.(item.id);
            }}
          >
            {/* Transparent larger hit area for easier tapping on mobile */}
            <circle r={20} fill="transparent" className="pointer-events-auto" />
            
            {/* Visible marker */}
            <circle 
              r={5} 
              className={`${colorClass} stroke-white dark:stroke-slate-900 stroke-2 group-hover:scale-150 transition-transform duration-200 drop-shadow-sm pointer-events-none`} 
              data-marker-name={item.name}
            />
          </g>
        );
      })}
    </>
  );
}

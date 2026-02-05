// Utility functions for MapPrompt

interface Location {
  address: string;
  lat: number;
  lon: number;
  display_name: string;
  search_radius?: number;
  poi_nearby?: {
    transport?: Array<{ name: string; distance: number }>;
    schools?: Array<{ name: string; distance: number }>;
    shops?: Array<{ name: string; distance: number }>;
    hospitals?: Array<{ name: string; distance: number }>;
    services?: Array<{ name: string; distance: number }>;
  };
}

/**
 * Calculate rating for a location based on POI availability
 * @param location Location object with POI data
 * @returns Rating from 0 to 10
 */
export const calculateRating = (location: Location): number => {
  const weights = {
    transport: 2.5,
    schools: 2.0,
    shops: 2.0,
    hospitals: 1.5,
    services: 2.0,
  };

  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(weights).forEach(([key, weight]) => {
    const count = location.poi_nearby?.[key as keyof typeof location.poi_nearby]?.length || 0;
    // Normalize: assume 10+ POIs = perfect score for that category
    const normalizedScore = Math.min(count / 10, 1) * 10;
    totalScore += normalizedScore * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? totalScore / totalWeight : 0;
};

/**
 * Save addresses to localStorage
 */
export const saveAddresses = (addresses: string) => {
  try {
    localStorage.setItem('mapprompt_last_addresses', addresses);
    localStorage.setItem('mapprompt_last_save', new Date().toISOString());
  } catch (error) {
    console.error('Failed to save addresses:', error);
  }
};

/**
 * Load addresses from localStorage
 */
export const loadAddresses = (): string => {
  try {
    return localStorage.getItem('mapprompt_last_addresses') || '';
  } catch (error) {
    console.error('Failed to load addresses:', error);
    return '';
  }
};

/**
 * Save radius to localStorage
 */
export const saveRadius = (radius: number) => {
  try {
    localStorage.setItem('mapprompt_last_radius', radius.toString());
  } catch (error) {
    console.error('Failed to save radius:', error);
  }
};

/**
 * Load radius from localStorage
 */
export const loadRadius = (): number => {
  try {
    const saved = localStorage.getItem('mapprompt_last_radius');
    return saved ? parseInt(saved, 10) : 1000;
  } catch (error) {
    console.error('Failed to load radius:', error);
    return 1000;
  }
};

/**
 * Export comparison data as CSV
 */
export const exportToCSV = (locations: Array<{ location: Location; rating: number }>) => {
  const headers = ['Adresa', 'Hodnocení', 'Doprava', 'Školy', 'Obchody', 'Nemocnice', 'Služby', 'Celkem POI'];
  
  const rows = locations.map((item) => {
    const poi = item.location.poi_nearby || {};
    return [
      item.location.address,
      item.rating.toFixed(1),
      poi.transport?.length || 0,
      poi.schools?.length || 0,
      poi.shops?.length || 0,
      poi.hospitals?.length || 0,
      poi.services?.length || 0,
      Object.values(poi).reduce((sum, arr) => sum + (arr?.length || 0), 0),
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  // Create download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `mapprompt-porovnani-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Copy comparison summary to clipboard
 */
export const copyToClipboard = async (locations: Array<{ location: Location; rating: number }>) => {
  const summary = locations
    .map((item, index) => {
      const totalPOI = Object.values(item.location.poi_nearby || {}).reduce(
        (sum, arr) => sum + (arr?.length || 0),
        0
      );
      return `${index + 1}. ${item.location.address}\n   Hodnocení: ${item.rating.toFixed(1)}/10 | POI: ${totalPOI}`;
    })
    .join('\n\n');

  try {
    await navigator.clipboard.writeText(summary);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Format distance for display
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${meters}m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

/**
 * Get rating color class
 */
export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return 'text-green-500';
  if (rating >= 6) return 'text-yellow-500';
  return 'text-orange-500';
};

/**
 * Get rating background class
 */
export const getRatingBg = (rating: number): string => {
  if (rating >= 8) return 'bg-green-500/10 border-green-500/30';
  if (rating >= 6) return 'bg-yellow-500/10 border-yellow-500/30';
  return 'bg-orange-500/10 border-orange-500/30';
};

/**
 * Get rating label
 */
export const getRatingLabel = (rating: number): string => {
  if (rating >= 8) return 'Výborná lokalita';
  if (rating >= 6) return 'Dobrá lokalita';
  if (rating >= 4) return 'Průměrná lokalita';
  return 'Slabá lokalita';
};

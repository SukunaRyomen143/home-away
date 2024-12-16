import { fetchProperties } from '@/utils/actions';
import PropertiesList from './PropertiesList';
import EmptyList from './EmptyList';
import type { PropertyCardProps } from '@/utils/types';

/**
 * PropertiesContainer component.
 *
 * Fetches properties based on the provided category and search query.
 * Renders PropertiesList if properties are found, otherwise renders EmptyList.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.category] - Category to filter properties by.
 * @param {string} [props.search] - Search query to filter properties by.
 * @returns {JSX.Element} - Rendered component.
 */
async function PropertiesContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  try {
    const properties: PropertyCardProps[] = await fetchProperties({
      category,
      search,
    });

    if (properties.length === 0) {
      return (
        <EmptyList
          heading="No results."
          message="Try changing or removing some of your filters."
          btnText="Clear Filters"
        />
      );
    }

    return <PropertiesList properties={properties} />;
  } catch (error) {
    console.error('Error fetching properties:', error);
    // You can also render an error message or a fallback component here
    return <div>Error fetching properties.</div>;
  }
}

export default PropertiesContainer;
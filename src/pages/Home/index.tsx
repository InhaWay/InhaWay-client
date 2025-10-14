import NaverMap from '../../shared/components/Map';
import LocationSelector from '../../shared/components/LocationSelector';

function index() {
  return (
    <div className="relative h-screen">
      <NaverMap />
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-p-white rounded-t-24">
        <LocationSelector />
      </div>
    </div>
  );
}

export default index;

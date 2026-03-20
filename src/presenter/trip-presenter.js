import TripInfoView from '../view/trip-info-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripEditView from '../view/trip-edit-view.js';

export default class TripPresenter {
  constructor({ tripModel }) {
    this._tripModel = tripModel;
    
    this._tripInfoComponent = null;
    this._filtersComponent = null;
    this._sortComponent = null;
    this._listComponent = null;
    this._editComponent = null;
    this._pointComponents = [];
  }

  init() {
    console.log('TripPresenter init started');
    
    this._renderTripInfo();
    this._renderFilters();
    this._renderSort();
    this._renderList();
    this._renderEditForm();
    this._renderPoints();
    
    console.log('TripPresenter init completed');
  }

  _renderTripInfo() {
    const tripMain = document.querySelector('.trip-main');
    if (!tripMain) {
      console.error('Trip-main container not found');
      return;
    }
    
    console.log('Rendering TripInfo');
    const points = this._tripModel.getPoints();
    const destinations = this._tripModel.getDestinations();
    
    this._tripInfoComponent = new TripInfoView({ points, destinations });
    const element = this._tripInfoComponent.getElement();
    
    // Вставляем в начало trip-main
    tripMain.insertBefore(element, tripMain.firstChild);
    console.log('TripInfo rendered');
  }

  _renderFilters() {
    const filtersContainer = document.querySelector('.trip-controls__filters');
    if (!filtersContainer) {
      console.error('Filters container not found');
      return;
    }
    
    console.log('Rendering Filters');
    this._filtersComponent = new TripFiltersView({ currentFilter: 'everything' });
    const element = this._filtersComponent.getElement();
    
    // Очищаем контейнер и добавляем фильтры
    filtersContainer.innerHTML = '';
    filtersContainer.appendChild(element);
    console.log('Filters rendered');
  }

  _renderSort() {
    const tripEvents = document.querySelector('.trip-events');
    if (!tripEvents) {
      console.error('Trip-events container not found');
      return;
    }
    
    console.log('Rendering Sort');
    this._sortComponent = new TripSortView({ currentSort: 'day' });
    const element = this._sortComponent.getElement();
    
    // Вставляем после заголовка
    const heading = tripEvents.querySelector('h2');
    if (heading) {
      tripEvents.insertBefore(element, heading.nextSibling);
    } else {
      tripEvents.insertBefore(element, tripEvents.firstChild);
    }
    console.log('Sort rendered');
  }

  _renderList() {
    const tripEvents = document.querySelector('.trip-events');
    if (!tripEvents) {
      console.error('Trip-events container not found');
      return;
    }
    
    console.log('Rendering List');
    this._listComponent = new TripListView();
    const element = this._listComponent.getElement();
    
    tripEvents.appendChild(element);
    console.log('List container rendered');
  }

  _renderEditForm() {
    const listContainer = this._listComponent?.getElement();
    if (!listContainer) {
      console.error('List container not found');
      return;
    }
    
    console.log('Rendering Edit Form');
    const points = this._tripModel.getPoints();
    
    if (points.length === 0) {
      console.log('No points to edit');
      return;
    }
    
    const firstPoint = points[0];
    const destinations = this._tripModel.getDestinations();
    
    // Создаем объект offersByType
    const offersByType = {};
    this._tripModel.getOffers().forEach(group => {
      offersByType[group.type] = group.offers;
    });

    console.log('Creating edit form for point:', firstPoint.id);
    
    this._editComponent = new TripEditView({
      point: firstPoint,
      destinations,
      offersByType,
      onSubmit: this._handleFormSubmit.bind(this),
      onDelete: this._handleFormDelete.bind(this),
      onClose: this._handleFormClose.bind(this)
    });
    
    const element = this._editComponent.getElement();
    listContainer.insertBefore(element, listContainer.firstChild);
    console.log('Edit form rendered');
  }

  _renderPoints() {
    const listContainer = this._listComponent?.getElement();
    if (!listContainer) {
      console.error('List container not found');
      return;
    }
    
    console.log('Rendering Points');
    const points = this._tripModel.getPoints();
    
    // Пропускаем первую точку
    const pointsToRender = points.slice(1);
    console.log(`Rendering ${pointsToRender.length} points`);
    
    pointsToRender.forEach((point, index) => {
      console.log(`Rendering point ${index + 1}:`, point.id);
      const pointComponent = new TripPointView({ point });
      this._pointComponents.push(pointComponent);
      listContainer.appendChild(pointComponent.getElement());
    });
    
    console.log('All points rendered');
  }

  _handleFormSubmit(pointData) {
    console.log('Form submitted:', pointData);
  }

  _handleFormDelete(pointId) {
    console.log('Form delete:', pointId);
  }

  _handleFormClose() {
    console.log('Form closed');
  }
}
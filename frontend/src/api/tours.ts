import api from './axiosInstance';
import {type TourPackage } from '../components/TourCard';

export const getTours = () => api.get<TourPackage[]>('/tours');

export const createTour = (data: TourPackage) =>
  api.post('/tours', data);

export const updateTour = (id: number, data: TourPackage) =>
  api.patch(`/tours/${id}`, data);

export const deleteTour = (id: number) =>
  api.delete(`/tours/${id}`);

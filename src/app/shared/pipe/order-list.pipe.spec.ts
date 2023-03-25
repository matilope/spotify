import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.models';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('Testing input and output values', () => {
    // arrange
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default;

    // act
    const result: TrackModel[] = pipe.transform(data);

    //assert
    expect(result).toEqual(data);
  });

  it('Testing if it sorts the correct way -> asc', () => {
    // arrange
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default;

    const firstValue: TrackModel = data.find((i: any) => i._id == 7);
    const lastValue: TrackModel = data.find((i: any) => i._id == 6);

    // act
    const result: TrackModel[] = pipe.transform(data, 'name', 'asc');
    const firstResult = result[0];
    const lastResult = result[result.length - 1];

    //assert
    expect(firstResult).toEqual(firstValue);
    //assert
    expect(lastResult).toEqual(lastValue);

    // reporte de cobertura -> es la medida porcentual de que tantas lineas de tu app se probaron en relacion a la cantidad de testing o de pruebas que haya.
  });
});

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IVehicle } from '../vehicle.model';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'jhi-vehicle',
  templateUrl: './vehicle.component.html',
})
export class VehicleComponent implements OnInit {
  vehicles?: IVehicle[];
  isLoading = false;

  constructor(protected vehicleService: VehicleService) {}

  loadAll(): void {
    this.isLoading = true;

    this.vehicleService.query().subscribe({
      next: (res: HttpResponse<IVehicle[]>) => {
        this.isLoading = false;
        this.vehicles = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IVehicle): number {
    return item.id!;
  }
}

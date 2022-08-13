import { TokenStorageService } from './../../shared/services/token-storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const { baseUrl } = environment;

@Injectable()
export class RestaurantDashboardService {
  private IdRest: string = ''
  private readonly restaurantsDetail = `${baseUrl}/api/restaurants/detail`
  private readonly restaurantsEdit = `${baseUrl}/api/restaurants/edit`
  private readonly createWaiter = `${baseUrl}/api/restaurants/${this.IdRest}/staff/create`
  // private readonly listCategory = `${baseUrl}/api/restaurants/${this.IdRest}/categories/list`
  // private readonly createCategory = `${baseUrl}/api/restaurants/${this.IdRest}/categories/create`
  // 62bf08f2a268984cb0235994 :id resturan
  constructor(private http: HttpClient, private TokenStorageService: TokenStorageService) {
    console.log("id rest service injection", this.TokenStorageService.getIdRest());
    this.IdRest = this.TokenStorageService.getIdRest()
  }


  // * done
  postRestaurantsEdit(formData: FormData): Observable<any> {
    return this.http.put(this.restaurantsEdit, formData)
  }

  getListCategory(): Observable<Array<any>> {
    let apiListCategory=`${baseUrl}/api/restaurants/${this.IdRest}/categories/list`
    return this.http.get<Array<any>>(apiListCategory)
  }
  postCreateCategory(nameCategory: string): Observable<any> {
    let api= `${baseUrl}/api/restaurants/${this.IdRest}/categories/create`
    return this.http.post(api, { name: nameCategory })
  }
  EditCategory(nameCategory: string, idCategory: string): Observable<any> {
    console.log("idCategory",idCategory);

    let apiEditCategory = `${baseUrl}/api/restaurants/${this.IdRest}/categories/${idCategory}/edit`
    return this.http.put(apiEditCategory, { name: nameCategory })
  }
  // * done
  postAddKitchen(kitchenData: any, restId: string): Observable<any> {
    let ApiAddKitchen = `${baseUrl}/api/restaurants/${restId}/kitchen/edit`
    return this.http.put(ApiAddKitchen, kitchenData)
  }



  // * done
  postCreateWaiter(WaiterRegisterData: any, idRest: string): Observable<any> {
    console.log("idRest", idRest);
    console.log("this.IdRest", this.IdRest);
    let createWaiterApi = `${baseUrl}/api/restaurants/${idRest}/staff/create`
    return this.http.post(createWaiterApi, WaiterRegisterData)

  }
  // * done
  getListAllEmployers(): Observable<any> {
// /api/restaurants/:id/staff/allEmployers
    let apiListEmployees = `${baseUrl}/api/restaurants/${this.IdRest}/staff/allEmployers`
    return this.http.get(apiListEmployees)
  }
  //* done
  staffDelete(idStaff: string): Observable<any> {
    let apiStaffDelete = `${baseUrl}/api/restaurants/${this.IdRest}/staff/delete`
    return this.http.delete(apiStaffDelete, { body: { id: idStaff } })

  }
  // * done
  postRestaurantsDetail(id: string): Observable<any> {
    return this.http.post(this.restaurantsDetail, { id: id })
  }

  getAllTables(): Observable<Array<any>> {
    let apiGetAllTables = `${baseUrl}/api/restaurants/${this.IdRest}/tables/list`
    return this.http.get<Array<any>>(apiGetAllTables)
  }


  // TODo : fixed this fun !
  creteNewTable(number: string): Observable<any> {
    console.log(number, " create tables number service ");

    let apiNewTable = `${baseUrl}/api/restaurants/${this.IdRest}/tables/edit`
    return this.http.put(apiNewTable, { number: number })
  }

  // * done
  getListReservations(): Observable<any> {
    let apiListReservations = `${baseUrl}/api/restaurants/${this.IdRest}/reservations/list`
    return this.http.get(apiListReservations)
  }
  //* done
  acceptReservation(idReservation: string): Observable<any> {
    let apiAcceptReservation = `${baseUrl}/api/restaurants/${this.IdRest}/reservations/accept`
    return this.http.put(apiAcceptReservation, { id: idReservation })
  }
  // * done
  rejectReservation(idReservation: string): Observable<any> {
    let apiRejectReservation = `${baseUrl}/api/restaurants/${this.IdRest}/reservations/reject`
    return this.http.put(apiRejectReservation, { id: idReservation })
  }

  // /api/restaurants/:id/taxes/list
  getAllTaxes(): Observable<any> {
    let apiAllTaxes = `${baseUrl}/api/restaurants/${this.IdRest}/taxes/list`
    return this.http.get(apiAllTaxes)
  }
  editTax(data: any, idTax: string): Observable<any> {
    // * Tax id included data
    let obj = { ...data, id: idTax }
    let apiEditTax = `${baseUrl}/api/restaurants/${this.IdRest}/taxes/edit`
    return this.http.put(apiEditTax, obj)
  }
  deleteTax(idTax: string): Observable<any> {
    let apiDeleteTax = `${baseUrl}/api/restaurants/${this.IdRest}/taxes/delete`
    return this.http.delete(apiDeleteTax, { body: { id: idTax } })
  }
  createTax(data: any): Observable<any> {
    let apiCreateTax = `${baseUrl}/api/restaurants/${this.IdRest}/taxes/create`
    return this.http.post(apiCreateTax, data)
  }

  // * Meals Apis
  getListMeals(idCategory:string):Observable<any>{
  let apiAllMeals=`${baseUrl}/api/restaurants/${this.IdRest}/meals/${idCategory}/list`
  return this.http.get(apiAllMeals)
  }
  // api/restaurants/:id/meals/create
  CreateMale(MaleData:FormData):Observable<any>{
    let apiCreateMale=`${baseUrl}/api/restaurants/${this.IdRest}/meals/create`
    return this.http.post(apiCreateMale,MaleData)
  }
  DeleteMale(idMale:string):Observable<any>{
    let apiDeleteMae=`${baseUrl}/api/restaurants/${this.IdRest}/meals/${idMale}/delete`
    return this.http.delete(apiDeleteMae)
  }
  //
  editMale(maleData:FormData, idMale:string){
    let apiEditMale=`${baseUrl}/api/restaurants/${this.IdRest}/meals/${idMale}/edit`
    return this.http.put(apiEditMale,maleData)
  }

  // bill list
  getBillList(pageNumber?:number):Observable<any>{
    let apiBillList =`${baseUrl}/api/restaurants/${this.IdRest}/bill/list`
    return this.http.post(apiBillList,{pageNumber:pageNumber})
  }
  getBillDetails(idBill:string):Observable<any>{
    let apiGetBillDetails=`${baseUrl}/api/restaurants/${this.IdRest}/bill/${idBill}/details`
    return this.http.get(apiGetBillDetails)
  }



}

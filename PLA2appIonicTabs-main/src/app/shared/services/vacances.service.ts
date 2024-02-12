import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IVacanca } from 'src/app/model/vacanca';

@Injectable({
  providedIn: 'root'
})
export class VacancesService {

  constructor(
    private firestore: Firestore,
    private auth: Auth) { }

  getVacances(): Observable<IVacanca[]> {
    const vacancesRef = collection(this.firestore, 'vacances');
    return collectionData(vacancesRef, { idField: 'id'}) as Observable<IVacanca[]>;
  }

  getVacancesByUser(): Observable<IVacanca[]> {
    const vacancesRef = collection(this.firestore, 'vacances');
    const userFilter = query(vacancesRef, where('user', '==', this.auth.currentUser!.uid));
    return collectionData(userFilter, { idField: 'id'}) as Observable<IVacanca[]>;
  }
  
  addVCacanca(vacances: IVacanca) {
    vacances.user = this.auth.currentUser!.uid;
    const vacancesRef = collection(this.firestore, 'vacances');
    return addDoc(vacancesRef, vacances);
  }

  deleteNote(vacanca: IVacanca) {
    const vacancesDocRef = doc(this.firestore, `vacances/${vacanca.id}`);
    return deleteDoc(vacancesDocRef);
  }

  updateVacances(vacanca: IVacanca) {
    const vacancesDocRef = doc(this.firestore, `vacances/${vacanca.id}`);
    return updateDoc(vacancesDocRef, {
      id: vacanca.id,
      nom: vacanca.nom,
      preu: vacanca.preu,
      pais: vacanca.pais,
      descripcio: vacanca.descripcio
    });
  }

  getNoteById(id: string): Observable<IVacanca> {
    const vacancesDocRef = doc(this.firestore, `vacances/${id}`);
    return docData(vacancesDocRef, { idField: 'id' }) as Observable<IVacanca>;
  }
  
}

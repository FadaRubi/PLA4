import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IVacanca } from 'src/app/model/vacanca';
import { VacancesService } from 'src/app/shared/services/vacances.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vacanca-form',
  templateUrl: './vacanca-form.page.html',
  styleUrls: ['./vacanca-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class VacancaFormPage implements OnInit {

  @Input() id?: string;

  vacancaForm!: FormGroup;
  buttonText: string = '';

  constructor(private vacancesService: VacancesService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    if (this.id) {
      this.vacancesService.getNoteById(this.id).subscribe((data) => {
        const v: IVacanca = data;
        this.buttonText = 'Update';
        this.initForm(v);
      });
    } else {
      this.buttonText = 'Guardar';
      this.initForm();
    }
  }

  initForm(v: IVacanca = {} as IVacanca) {
    this.vacancaForm = this.formBuilder.group({
      nom: [{value: v.nom, disabled: false}, [Validators.required, Validators.minLength(5)]],
      preu: [{value: v.preu, disabled: false}, [Validators.required]],
      pais: [{value: v.pais, disabled: false}, [Validators.required]],
      descripcio: [{value: v.descripcio, disabled: false}, []]
    })
  }  

  guardarVacanca() {
    const v = this.vacancaForm.value as IVacanca;
    console.log(v);
    if (!this.id) {
      this.vacancesService.addVCacanca(v).then(() => {
        this.router.navigateByUrl('/tabs/tab1');
      });
    } else {
      v.id = this.id;
      this.vacancesService.updateVacances(v).then(() => {
        this.router.navigateByUrl('/tabs/tab1');
      });
    }
  }

}

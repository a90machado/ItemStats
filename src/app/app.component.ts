import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private formGroupItem: FormGroup = new FormGroup({
    typeOfItem: new FormControl(''),
    typeOfElement: new FormControl('')
  });

  private formGroupRolls: FormGroup = new FormGroup({
    atkSpell: new FormControl(null, Validators.required),
    atkSpellValue: new FormControl(),
    rolledAtk: new FormControl(null, Validators.required),
    rolledSpd: new FormControl(null, Validators.required)
  });

  public get typeOfItem(): FormControl { return this.formGroupItem.get('typeOfItem') as FormControl; }
  public get typeOfElement(): FormControl { return this.formGroupItem.get('typeOfElement') as FormControl; }

  public get atkSpell(): FormControl { return this.formGroupRolls.get('atkSpell') as FormControl; }
  public get atkSpellValue(): FormControl { return this.formGroupRolls.get('atkSpellValue') as FormControl; }
  public get rolledAtk(): FormControl { return this.formGroupRolls.get('rolledAtk') as FormControl; }
  public get rolledSpd(): FormControl { return this.formGroupRolls.get('rolledSpd') as FormControl; }


  public typeOfItems = [
    {
      label: 'Weapons',
      value: 1
    },
    {
      label: 'Armor',
      value: 2
    },
    {
      label: 'Belt',
      value: 3
    },
    {
      label: 'Necklace',
      value: 4
    },
    {
      label: 'Ring',
      value: 5
    }
  ];

  public typeOfElements = [
    {
      label: 'Fire',
      value: 'Fire'
    },
    {
      label: 'Water',
      value: 'Water'
    },
    {
      label: 'Land',
      value: 'Land'
    },
    {
      label: 'Wind',
      value: 'Wind'
    },
    {
      label: 'Neutral',
      value: 'Neutral'
    }
  ];

  public weapons = [
    {
      name: 'WAR Sword',
      type: 'Neutral',
      baseAtk: 3094,
      atkMin: 1099,
      spdMin: 50.88,
      atkMin2: 841,
      atkMax: 1412,
      spdMax: 64.57,
      atkMax2: 1128,
      image: "https://static.wikia.nocookie.net/gensin-impact/images/c/c9/Weapon_Traveler%27s_Handy_Sword.png/revision/latest?cb=20201116035456"
    }
  ];


  public searchItems: any = [];
  public selectedItem: any;
  public rollStats: any;

  public ngOnInit(): void {
    this.typeOfElement.valueChanges.subscribe(value => {
      if (this.typeOfItem.value === 1) {
        this.searchItems = this.weapons.filter( weapon => weapon.type === value);
      } else if (this.typeOfItem.value === 2) {

      } else if (this.typeOfItem.value === 3) {

      } else if (this.typeOfItem.value === 4) {

      } else if (this.typeOfItem.value === 5) {

      }

    });
  }

  public checkQuality(item: any): void {
    this.selectedItem = item;
  }

  public goBackToItems(): void {
    this.selectedItem = null;
    this.rollStats = null;
  }

  public checkResults(): void {
    if (this.formGroupRolls.valid) {
      this.rollStats = {
        rollStrengthAtk: ((this.rolledAtk.value - (this.selectedItem.atkMin + this.selectedItem.atkMin2)) / ((this.selectedItem.atkMax + this.selectedItem.atkMax2) - (this.selectedItem.atkMin + this.selectedItem.atkMin2))),
        rollStrengthSpd: ((this.rolledSpd.value - (this.selectedItem.spdMin)) / ((this.selectedItem.spdMax) - (this.selectedItem.spdMin))),
        statStrengthAtk: (this.rolledAtk.value / (this.selectedItem.atkMax + this.selectedItem.atkMax2)),
        statStrengthSpd: (this.rolledSpd.value / this.selectedItem.spdMax),
        quality: 0
      };
      const m34 = (this.rollStats.rollStrengthAtk + this.rollStats.statStrengthAtk) / 2;
      const m35 = (this.rollStats.rollStrengthSpd + this.rollStats.statStrengthSpd) / 2;
      this.rollStats.quality = (m34 + m35) / 2;
    } else {
      this.formGroupRolls.markAllAsTouched();
    }
  }




}


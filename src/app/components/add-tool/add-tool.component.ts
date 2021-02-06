import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.css']
})
export class AddToolComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {
  }
  platformsDropdown = [];
  categoriesDropdown = [];
  selectedCategories = [];
  selectedPlatforms = [];
  dropdownSettings = {};
  addToolForm: FormGroup;
  category = false;
  platform = false;

  ngOnInit() {
    this.apiService.getCategories().subscribe(result => {
      for (let i = 0 ; i < result['categories'].length ; i++){
        this.categoriesDropdown.push({item_id: i, item_text: result['categories'][i]})
      }
      this.category = true;
    });
    this.apiService.getPlatforms().subscribe(result => {
      for (let i = 0 ; i < result['platforms'].length ; i++){
        this.platformsDropdown.push({item_id: i, item_text: result['platforms'][i]})
      }
      this.platform = true;
    });
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Zaznacz wszystkie',
      unSelectAllText: 'Odznacz wszystkie',
    };
    this.initForm();
  }

  initForm(){
    this.addToolForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      iconURL: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      fullDescription: new FormControl('', [Validators.required]),
      directLinkURL: new FormControl('', [Validators.required]),
      categories: new FormControl(this.selectedCategories,  Validators.required),
      platforms: new FormControl(this.selectedPlatforms,  Validators.required)
    });
  }

  addToolProcess(){
    for (let i = 0; i < this.addToolForm.controls.categories.value.length ; i++) {
      this.selectedCategories.push(this.addToolForm.controls.categories.value[i].item_text);
    }
    for (let i = 0; i < this.addToolForm.controls.platforms.value.length ; i++) {
      this.selectedPlatforms.push(this.addToolForm.controls.platforms.value[i].item_text);
    }
    this.addToolForm.controls.categories.setValue(this.selectedCategories);
    this.addToolForm.controls.platforms.setValue(this.selectedPlatforms);
    this.apiService.addTool(this.addToolForm.value).subscribe(result => {
      this.router.navigate(['tools'], {skipLocationChange: true});
    })
  }
}

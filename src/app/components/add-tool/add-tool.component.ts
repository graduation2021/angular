import {Component, OnInit} from '@angular/core';
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
  shortDescriptionError: string;
  fullDescriptionError: string;
  iconUrlError: string;
  directLinkError: string;
  nameError: string;
  selectError: string;
  validIMG: any;

  ngOnInit() {
    this.apiService.getCategories().subscribe(result => {
      for (let i = 0; i < result['categories'].length; i++) {
        this.categoriesDropdown.push({item_id: i, item_text: result['categories'][i]});
      }
      this.category = true;
    });
    this.apiService.getPlatforms().subscribe(result => {
      for (let i = 0; i < result['platforms'].length; i++) {
        this.platformsDropdown.push({item_id: i, item_text: result['platforms'][i]});
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

  initForm() {
    this.addToolForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      iconURL: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required, Validators.pattern('^.{0,255}')]),
      fullDescription: new FormControl('', [Validators.required, Validators.pattern('^.{0,1500}')]),
      directLinkURL: new FormControl('', [Validators.required, Validators.pattern('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$')]),
      categories: new FormControl(this.selectedCategories, Validators.required),
      platforms: new FormControl(this.selectedPlatforms, Validators.required)
    });
  }

  addToolProcess() {
    var validImg = null;
    var img = new Image();
    img.src = this.addToolForm.controls.iconURL.value;
    var promise = new Promise(function(resolve, reject) {
      img.onload = function() {
        validImg = true;
        resolve(validImg);
      };
      img.onerror = function() {
        validImg = false;
        resolve(validImg);
      };
    });
    promise.then((res) => {
      this.validIMG = res;

      if (this.addToolForm.controls.shortDescription.invalid) {
        this.shortDescriptionError = 'Krótki opis nie może być dłuższy niż 255 znaków';
      } else {
        this.shortDescriptionError = null;
      }

      if (this.addToolForm.controls.fullDescription.invalid) {
        this.fullDescriptionError = 'Pełny opis nie może być dłuższy niż 1500 znaków';
      } else {
        this.fullDescriptionError = null;
      }

      if (!this.validIMG) {
        this.iconUrlError = 'Wskazany adres URL ikony jest niepoprawny';
      } else {
        this.iconUrlError = null;
      }

      if (this.addToolForm.controls.directLinkURL.invalid) {
        this.directLinkError = 'Podany adres URL jest nieprawidłowy';
      } else {
        this.directLinkError = null;
      }

      if (this.addToolForm.controls.name.invalid) {
        this.nameError = 'Wpisz tytuł';
      } else {
        this.nameError = null;
      }

      if (this.addToolForm.controls.categories.value.length == 0) {
        this.selectError = 'Wybierz conajmniej jedno';
      } else {
        this.selectError = null;
      }

      if (this.addToolForm.controls.platforms.value.length == 0) {
        this.selectError = 'Wybierz conajmniej jedno';
      } else {
        this.selectError = null;
      }

      if (this.addToolForm.valid && this.validIMG) {
        for (let i = 0; i < this.addToolForm.controls.categories.value.length; i++) {
          this.selectedCategories.push(this.addToolForm.controls.categories.value[i].item_text);
        }
        for (let i = 0; i < this.addToolForm.controls.platforms.value.length; i++) {
          this.selectedPlatforms.push(this.addToolForm.controls.platforms.value[i].item_text);
        }
        this.addToolForm.controls.categories.setValue(this.selectedCategories);
        this.addToolForm.controls.platforms.setValue(this.selectedPlatforms);
        this.apiService.addTool(this.addToolForm.value).subscribe(result => {
          this.router.navigate(['tools'], {skipLocationChange: true});
        })
      }
    });
  }
}


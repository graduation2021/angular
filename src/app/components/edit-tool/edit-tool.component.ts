import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Tool} from '../../models/tool';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-tool',
  templateUrl: './edit-tool.component.html',
  styleUrls: ['./edit-tool.component.css']
})
export class EditToolComponent implements OnInit {
  platformsDropdown = [];
  categoriesDropdown = [];
  selectedCategories = [];
  selectedPlatforms = [];
  dropdownSettings = {};
  editToolForm: FormGroup;
  category = false;
  platform = false;
  toolBoolean = false;
  tool: Tool;
  id: number;

  shortDescriptionError: string;
  fullDescriptionError: string;
  iconUrlError: string;
  directLinkError: string;
  nameError: string;
  selectError: string;
  validIMG: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getTool();
    this.initSettings();
    this.initForm();
    this.getCategories();
    this.getPlatforms();
  }

  initSettings() {
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Zaznacz wszystkie',
      unSelectAllText: 'Odznacz wszystkie',
    };
  }

  getPlatforms() {
    this.apiService.getPlatforms().subscribe(result => {
      for (let i = 0; i < result['platforms'].length; i++) {
        this.platformsDropdown.push({item_id: i, item_text: result['platforms'][i]});
      }
      for (let i = 0; i < this.platformsDropdown.length; i++) {
        if (this.tool.platforms.includes(this.platformsDropdown[i].item_text)) {
          this.selectedPlatforms.push(this.platformsDropdown[i]);
        }
      }
      this.platform = true;
    });
  }

  getCategories() {
    this.apiService.getCategories().subscribe(result => {
      for (let i = 0; i < result['categories'].length; i++) {
        this.categoriesDropdown.push({item_id: i, item_text: result['categories'][i]});
      }
      for (let i = 0; i < this.categoriesDropdown.length; i++) {
        if (this.tool.categories.includes(this.categoriesDropdown[i].item_text)) {
          this.selectedCategories.push(this.categoriesDropdown[i]);
        }
      }
      this.category = true;
    });
  }

  getTool() {
    this.apiService.getTool(this.id).subscribe(result => {
      this.tool = result['tool'];
      this.toolBoolean = true;
    });
  }

  initForm() {
    this.editToolForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      iconURL: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      fullDescription: new FormControl('', [Validators.required]),
      directLinkURL: new FormControl('', [Validators.required]),
      categories: new FormControl(this.selectedCategories, Validators.required),
      platforms: new FormControl(this.selectedPlatforms, Validators.required)
    });
  }

  editToolProcess() {
    var validImg = null;
    var img = new Image();
    img.src = this.editToolForm.controls.iconURL.value;
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

      if (this.editToolForm.controls.shortDescription.invalid) {
        this.shortDescriptionError = 'Krótki opis nie może być dłuższy niż 255 znaków';
      } else {
        this.shortDescriptionError = null;
      }

      if (this.editToolForm.controls.fullDescription.invalid) {
        this.fullDescriptionError = 'Pełny opis nie może być dłuższy niż 1500 znaków';
      } else {
        this.fullDescriptionError = null;
      }

      if (!this.validIMG) {
        this.iconUrlError = 'Wskazany adres URL ikony jest niepoprawny';
      } else {
        this.iconUrlError = null;
      }

      if (this.editToolForm.controls.directLinkURL.invalid) {
        this.directLinkError = 'Podany adres URL jest nieprawidłowy';
      } else {
        this.directLinkError = null;
      }

      if (this.editToolForm.controls.name.invalid) {
        this.nameError = 'Wpisz tytuł';
      } else {
        this.nameError = null;
      }

      if (this.editToolForm.controls.categories.value.length == 0) {
        this.selectError = 'Wybierz conajmniej jedno';
      } else {
        this.selectError = null;
      }

      if (this.editToolForm.controls.platforms.value.length == 0) {
        this.selectError = 'Wybierz conajmniej jedno';
      } else {
        this.selectError = null;
      }

      if (this.editToolForm.valid && this.validIMG) {
        this.selectedCategories = [];
        this.selectedPlatforms = [];
        for (let i = 0; i < this.editToolForm.controls.categories.value.length; i++) {
          this.selectedCategories.push(this.editToolForm.controls.categories.value[i].item_text);
        }
        for (let i = 0; i < this.editToolForm.controls.platforms.value.length; i++) {
          this.selectedPlatforms.push(this.editToolForm.controls.platforms.value[i].item_text);
        }
        this.editToolForm.controls.categories.setValue(this.selectedCategories);
        this.editToolForm.controls.platforms.setValue(this.selectedPlatforms);
        this.apiService.putTool(this.id, this.editToolForm.value).subscribe(result => {
            this.router.navigate([`tool/${this.id}`], {skipLocationChange: true});
          },
          error => {
            this.router.navigate([`tool/${this.id}`], {skipLocationChange: true});
          });
      }
    });
  }
}

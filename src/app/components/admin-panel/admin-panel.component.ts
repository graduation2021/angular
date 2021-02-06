import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  selectedUser = [];
  selectedRole = [];
  usersDropdown = [];
  rolesDropdown = [];
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  users = false;
  roles = false;
  addRoleForm: FormGroup;

  constructor(private adminService: AdminService, private router: Router) {
  }

  ngOnInit(): void {
    this.reset();
    this.getUsers();
    this.getRoles();
    this.initSettings();
    this.initForm();
  }

  initSettings() {
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true,
      searchPlaceholderText: 'Szukaj'
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Zaznacz wszystkie',
      unSelectAllText: 'Odznacz wszystkie',
    };
  }

  initForm() {
    this.addRoleForm = new FormGroup({
      user: new FormControl(this.selectedUser, Validators.required),
      role: new FormControl(this.selectedRole, Validators.required)
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe(result => {
      for (let i = 0; i < result['users'].length; i++) {
        this.usersDropdown.push({item_id: result['users'][i]['id'], item_text: result['users'][i]['username']});
      }
      this.users = true;
    });
  }

  getRoles() {
    this.adminService.getRoles().subscribe(result => {
      for (let i = 0; i < result['roles'].length; i++) {
        this.rolesDropdown.push({item_id: i, item_text: result['roles'][i]});
      }
      this.roles = true;
    });
  }

  reset(){
    this.selectedRole = [];
    this.selectedUser = [];
    this.usersDropdown = [];
    this.rolesDropdown = [];
    this.users = false;
    this.roles = false;
  }

  addRoleProcess() {
    if (this.addRoleForm.valid) {
      for (let i = 0; i < this.addRoleForm.controls.user.value.length; i++) {
        this.selectedUser.push(this.addRoleForm.controls.user.value[i].item_text);
      }
      for (let i = 0; i < this.addRoleForm.controls.role.value.length; i++) {
        this.selectedRole.push(this.addRoleForm.controls.role.value[i].item_text);
      }
      let userId = this.addRoleForm.controls.user.value[0].item_id;
      this.addRoleForm.controls.user.setValue(this.selectedUser);
      this.addRoleForm.controls.role.setValue(this.selectedRole);
      let json = {'role': this.addRoleForm.controls.role.value};
      this.adminService.addRole(userId, json).subscribe(result => {
          this.ngOnInit();
          }, error => {
        this.ngOnInit();
      });
    }
  }

  deleteUser() {
    if(this.addRoleForm.controls.user.valid){
      let userId = this.addRoleForm.controls.user.value[0].item_id;
      this.adminService.deleteUser(userId).subscribe(result => {
        this.router.navigate(['adminPanel'], {skipLocationChange: true});
        this.ngOnInit();
      },error => {
        this.ngOnInit();
      });
    }

  }
}

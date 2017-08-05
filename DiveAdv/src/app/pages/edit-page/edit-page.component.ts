import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Response } from '@angular/http';
import { PageService } from "../../pages/page.service";
import { DataStorageService } from "../../shared/data-storage.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  editMode = false;
  editPageForm: FormGroup;
  // currentPage: number = this.pageService.currentPage;
  currentPage: number;

  constructor(private route: ActivatedRoute,
              private pageService: PageService,
              private router: Router,
              private dataStorageService: DataStorageService) {  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentPage = +params['pageNumber'];
          // If params is undefined, this returns false, and we're in new mode.
          // If params has pageNumber, this returns true, and we're in edit mode.
          this.editMode = params['pageNumber'] != null;
          // Call initForm() whenever our route params change:
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.pageService.updatePage(this.editPageForm.value);
      this.dataStorageService.savePages()
        .subscribe(
          (response: Response) => {
            console.log(response);
          }
        );
      console.log("Pages saved!");
    } else {
      this.pageService.addPage(this.editPageForm.value);
      this.dataStorageService.savePages()
        .subscribe(
          (response: Response) => {
            console.log(response);
          }
        );
      console.log("Pages saved!");
    }
    this.onCancel();
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(['../..', this.currentPage], {relativeTo: this.route});
    } else {
      this.router.navigate(['/story/1'], {relativeTo: this.route});
    }
  }

  getControls() {
    return(<FormArray>this.editPageForm.get('choices')).controls;
  }

  // REFACTOR ME! Duplicated on new page.
  onAddChoice() {
  //Push a form group containing choice text and page to the choices form array.
    (<FormArray>this.editPageForm.get('choices')).push(
      new FormGroup({
        'choice' : new FormControl(),
        'page' : new FormControl()
      })
    );
  }

  private initForm() {
    let pageNumber: number;
    // let pageTitle = '';
    let imagePath = '';
    let pageText = '';
    let pageChoices = new FormArray([]);

    if (this.editMode) {
      const page = this.pageService.getPage(this.currentPage);
      pageNumber = page.pageNumber;
      imagePath = page.imagePath;
      pageText = page.pageText
      // Check if page has choices
      if (page['choices']) {
        // Add choices to array to show on form.
        for (let choice of page.choices) {
          pageChoices.push(
            new FormGroup({
              'choice': new FormControl(choice.choice, Validators.required),
              'page' : new FormControl(choice.page, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }


    } // end if editMOde

    // Initialize the form
    this.editPageForm = new FormGroup({
      'pageNumber': new FormControl(pageNumber, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'pageText': new FormControl(pageText, Validators.required),
      'choices': pageChoices


    });

  } // end initForm



}

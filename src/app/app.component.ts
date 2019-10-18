import {Component, OnInit} from '@angular/core';
import {Employee} from './employee';
import {FormPosterService} from './services/form-poster.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {Customer} from './customer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    // title = 'angular-forms';
    // bsInlineValue = new Date();
    // config: Partial<BsDatepickerConfig> = {
    //     showWeekNumbers: false,
    //     dateInputFormat: 'DD-MM-YYYY',
    // };
    // selectedDate: Date;
    // languages = [];
    //
    // model = new Employee('Hamada', 'default');
    // hasPrimaryLanguageErr = false;
    //

    // -------- reactive forms variables --------
    customersForm: FormGroup;
    customer: Customer = new Customer();

    emailMessage: string;
    private validationMessages: {
        required: 'Please enter your email address',
        pattern: 'Please enter a valid email address'
    };

    // -------- end --------

    constructor(private formPoster: FormPosterService, private fb: FormBuilder) {
    }

    // validatePrimaryLang(value) {
    //     if (value === 'default') {
    //         this.hasPrimaryLanguageErr = true;
    //     } else {
    //         this.hasPrimaryLanguageErr = false;
    //     }
    // }
    //
    // submitForm(form: NgForm) {
    //     this.validatePrimaryLang(this.model.primaryLanguage);
    //     if (this.hasPrimaryLanguageErr) {
    //         return;
    //     }
    //     this.formPoster.postEmployeeForm(this.model)
    //         .subscribe(
    //             data => console.log('success:', data),
    //             error => console.log('error', error)
    //         );
    // }

    ngOnInit(): void {
        // this.formPoster.getLanguages()
        //     .subscribe(
        //         data => this.languages = data.data.languages,
        //         error => console.log('error', error)
        //     );

        // this.customersForm = new FormGroup({
        //     firstName: new FormControl(),
        //     lastName: new FormControl(),
        //     email: new FormControl(),
        //     sendCatalogue: new FormControl(true),
        // });

        this.customersForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: '',
            email: '',
            notification: 'email',
            sendCatalogue: true
        });


        // watch radio button changes:
        this.customersForm.get('notification').valueChanges.subscribe(value => console.log(value));

        // email validation messages:
        const emailControl = this.customersForm.get('email');
        emailControl.valueChanges.subscribe(value => this.setMessage(emailControl));
    }


    // Reactive forms
    save() {
        console.log(this.customersForm);
        console.log('saved: ', JSON.stringify(this.customersForm.value));
    }

    dumpVar(object) {
        console.dir(object);
    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if (c.touched || c.dirty && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ')
        }
    }

}

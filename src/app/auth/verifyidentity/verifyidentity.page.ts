import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotifyService} from "../../services/notify.service";
import {CountryNameService} from "../../services/countryname.service";
import {AccountApiService} from "../../services/accountApi.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidateService} from "../../services/validate.service";
import {SettingsService} from "../../services/settings.service";

declare const $: any;
@Component({
    selector: 'app-verifyidentity-page',
    templateUrl: './verifyidentity.page.html',
    styleUrls: ['./verifyidentity.page.scss']
})

export class VerifyIdentityPage implements OnInit {
    step = 1;
    verifydata: any = {
        'type': 'personal',
        'faceimage_url': ''
    };
    infoForm: FormGroup;

    constructor(public router: Router,
                public notify: NotifyService,
                public countryName: CountryNameService,
                public accountApi: AccountApiService,
                private formBuilder: FormBuilder,
                public validate: ValidateService,
                public settings: SettingsService
                ) {
    }

    ngOnInit() {
        this.infoForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            surname: ['', Validators.required],
            birthday: ['', Validators.required],
            address: ['', Validators.required],
            postal_code: ['', Validators.required],
            city: ['', Validators.required],
            country_code: ['', Validators.required]
        });
        this.accountApi.getVerifyData({}).subscribe((res:any)=> {
            if (res.success) {
                this.verifydata = res.data;
            }
        }, err=> {

        })
    }

    onClickPersonal() {
        this.verifydata.type = 'personal';
        this.step = 2;
    }

    onClickEnterprise() {
        this.notify.showWarning('Coming Soon');
    }

    onClickStep2Next() {
        if (this.infoForm.valid) {
            this.step = 3;
        } else {
            this.validate.validateAllFormFields(this.infoForm);
        }
    }

    onChooseFaceImage() {
        $('#faceimageFile').click();
    }

    onChooseIdcardImage() {
        $('#idcardFile').click();
    }

    onChoosePassportImage() {
        $('#passportFile').click();
    }

    onChooseDrivingImage() {
        $('#drivingFile').click();
    }

    fileChangeListener($event, type) {
        let image: any = new Image();
        let file: File = $event.target.files[0];

        if (!file) {
            return;
        }

        let filename = file.name;
        let extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();

        if (extension == 'gif' || extension == 'png' || extension == 'bmp' || extension == 'jpeg' || extension == 'jpg') {
            // let reader = new FileReader();
            //
            // reader.onload = function(e) {
            //     $('#card-preview').attr('src', e.target.result);
            // }
            //
            // reader.readAsDataURL(file);

            this.settings.loading = true;
            this.accountApi.uploadFile(file).subscribe((res:any) => {
                this.settings.loading = false;
                if (res.success) {
                    if (type == 'face') {
                        this.verifydata.faceimage_url = res.url;
                    } else {
                        this.verifydata.idcard_url = res.url;
                        this.verifydata.attach_name = file.name;
                    }
                }
            }, err => {
                this.notify.showError(err);
                this.settings.loading = false;
            });
        } else {
            this.notify.showWarning('Please select image file');
        }
    }

    onClickStep3Back() {
        this.step = 2;
    }

    onClickStep3Next() {
        if (this.verifydata.faceimage_url && this.verifydata.faceimage_url != '') {
            this.step = 4;
        } else {
            this.notify.showWarning('Please upload your face image');
        }
    }

    onClickStep4Back() {
        this.step = 3;
    }

    onClickPassport() {
        this.verifydata.verify_type = 2;
        this.step = 5;
    }

    onClickIDcard() {
        this.verifydata.verify_type = 1;
        this.step = 6;
    }

    onClickDriving() {
        this.verifydata.verify_type = 3;
        this.step = 7;
    }

    onGoStep4() {
        this.step = 4;
    }

    onGoStep8() {
        if (this.verifydata.idcard_url && this.verifydata.idcard_url != '') {
            this.settings.loading = true;
            this.accountApi.setVerifyData(this.verifydata).subscribe((res:any) => {
                this.settings.loading = false;
                if (res.success) {
                    this.step = 8;
                } else {
                    this.notify.showWarning(res.error);
                }
            }, err=> {
                this.settings.loading = false;
                this.notify.showError(err);
            });
        } else {
            this.notify.showWarning('Please upload your image');
        }
    }
}

var google = {
    script: {
        run: {
            callback: null,
            failureCallback: null,
            withSuccessHandler: function (callback) {
                google.script.run.callback = callback;
                return this;
            },
            withFailureHandler: function (callback) {
                google.script.run.failureCallback = callback;
                return this;
            },
            getDocs: function () {
                console.log('getDocs');
                this.callback([{
                    "id": "1hdq4bhbU9YGlbAoT-R9PEqb3tVERviyCVNQLUKR_9rI",
                    "name": "Subject: super subject for <CONFERENCE TITLE>"
                }, {
                    "id": "1VlZ5lyw9RQd108de6wF9y3UchTH6xVxW7zwqj3_RHOc",
                    "name": "Copy of TDSC Templates"
                }, {
                    "id": "1zHZzehrRn_yZf1ggrJwU-Ih9mE-_O2aiJTIL_qmm_b0",
                    "name": "Pytania do LabFiz"
                }, {
                    "id": "1SFW8xLGOxTXkhtza_ZE7HTf1KYKtgYEVMNg2uobrBHA",
                    "name": "Dokument bez tytułu"
                }, {
                    "id": "1zha2pPhIBu3r3hIV-IszWbEyE-4zCR-39vrGemyrCPM",
                    "name": "CV"
                }, {
                    "id": "1SXIIW5MG1uT7O6P6tBWwzjiLe_gj4_Z2HHhHXPehwso",
                    "name": "AHR_EN"
                }, {
                    "id": "1qYA0wI01QAXgYaAib-KchCSnhK77ViKk5rxypX-kGM8",
                    "name": "Karol.odt"
                }, {
                    "id": "179GaR7pUhxtoD7TTQ4HPmx-uRVWD7zX7FvK_SyChypc",
                    "name": "BwS"
                }, {
                    "id": "1D3ev6K6Ds0Bx_Kb3hyYMkDUpewdg901OL2q8PtCjlqo",
                    "name": "readme-kalorymetr"
                }, {
                    "id": "1nZbWYY9sgl1DY65cqUzfu83iRr6rCoqPSzy0GfsYCfw",
                    "name": "Dokument bez tytułu"
                }, {
                    "id": "1osxt7R9km4MG5A4GZQ9v1eQlkwwsxveWbOkfRbK2B1Y",
                    "name": "IO Szczegółówy projekt"
                }, {
                    "id": "1zjc3cX3iyxPDy27-hIGfen5eOa2yyJ_jM7cQmkZk01E",
                    "name": "Projekty"
                }, {
                    "id": "1qMJqKYbOGy8EhFHiGmu2WudpbN94P1YpI4u27KMKHPQ",
                    "name": "Propozycje projektów"
                }, {
                    "id": "1GmeQLF_1VU6PaYmCslAjLbbmIJfGPqnganrS1RZOtuI",
                    "name": "AtMega - PWM & Counter0"
                }, {"id": "1UqPHmtQGKBkH0KDjdKWvcmNTsoy7wnnftt0z077B5Ww", "name": "losy_absolw_kl"}]);
            },
            getSheets: function () {
                console.log('getSheets');
                this.callback([{
                    "id": "1kP-yzcICgsyI_nCQc7hxpGuRkXYngNf9KSwQUbZeBp0",
                    "name": "testowe podmiany - BatchMail (praca inż.)"
                }, {
                    "id": "1WlEdQ_h-EMhDNc15p1nlkK8astZlysMl9DzC0HjDZwU",
                    "name": "akademik rozliczenia"
                }, {
                    "id": "1AzZtPL68kHqY6g-h-bWXVl_9kZnNg9r6RnYi1OMs1Tc",
                    "name": "Biometria(kurs letni)"
                }, {
                    "id": "16DaqypBY65ujNkmYMGZRcdxwTBsutJmpiGjkW5DY7Xc",
                    "name": "Biometria"
                }, {
                    "id": "1mbSlg8ka2X1bKO9POM9CmQ1RJBjWEEDqQL4nvQHVSu0",
                    "name": "Lista na wycieczkę"
                }, {
                    "id": "1qdpM7fnIkiuZqAR69MjwOgS19Xp-8RxNihp2OTdRGYw",
                    "name": "Akataxer - Uwagi, skargi i zażalenia"
                }, {
                    "id": "1NOFQ_AOa9hybZmy1UWfjZCMPxq2HbPaVDhTy3AfQt-4",
                    "name": "Wstęp do fizyki kwantowej i statystycznej"
                }, {
                    "id": "1_JT6NARUZvPS_3Ljq_bBJFcVC73ydi48PqHvZEjhbbc",
                    "name": "PLAN"
                }, {
                    "id": "1jaXjqXM28VeBSa7yUR0q4vLQUi82BtBOsNo6WNXt4YE",
                    "name": "Mountains - September "
                }, {
                    "id": "1D19uBRigerBhUsRKjqUaeC_u-Q2yEcsgybQhEtssvs8",
                    "name": "po_sr_8_45"
                }, {
                    "id": "1t_orIh__1yJuQrn8hAKaWlmPOe3cFcJKIwHEvnDSEog",
                    "name": "Arkusz kalkulacyjny bez tytułu"
                }, {
                    "id": "1mCCHEjOAC06oZMdXdvQk87h8-BMlAfKsvqjbKQIsJ1o",
                    "name": "Wideo seminarium - druga iteracja"
                }, {
                    "id": "11f0Jm9XcjjuD6XuBu4T9EaRfSFQGy23SRP_dV4e_nwo",
                    "name": "Wideo seminarium - pierwsza iteracja"
                }, {
                    "id": "1OdECPhcuAmuzkunnD01_WRhIXxdvSGL3JZ8YBn8YRo0",
                    "name": "Projekty - głosowanie"
                }, {
                    "id": "1-09L_T_m9nwAa_D7ZTF55GG0kYL46W2-Y8Ziwmsklus",
                    "name": "Arkusz kalkulacyjny bez nazwy"
                }, {
                    "id": "1GXKG9gUcUtbbD-2DWfYRkSaObtza76teR0msH-fNWOk",
                    "name": "Plan.ods"
                }, {
                    "id": "1YUmHObU8gKXlfKZNMspspYTCWU8R8X7PGES8DTfG8Po",
                    "name": "learner5"
                }, {
                    "id": "1n3FTxVqLKDT2MIFl2eVgr1fTh26WslU3zW6G8eVsVt0",
                    "name": "Tematy na statystykę"
                }, {
                    "id": "1UiLCOJy8O2bxS6q1esN2KdodLmfED8GPTCs3qFHaIO8",
                    "name": "OCENY KLASA 1C - GRUPA 1"
                }]);
            },
            getBookmarks: function (doc_id) {
                console.log('getBookmarks', doc_id);
                this.callback([{"id": "id.ligwcz24hoq6", "name": "CONFERENCE ANNOUNCEMENT"}, {
                    "id": "id.dnh22tx5kety",
                    "name": "CONFERENCE REMINDER"
                }, {"id": "id.wkxrbxt5er9k", "name": "SPEAKER INVITATION"}, {
                    "id": "id.iu3ulnatqnkk",
                    "name": "Speaker invitation - short. (Catrin pls. check)"
                }, {"id": "id.lkvahz9fl5wk", "name": "Short listed - Checking availability"}, {
                    "id": "id.ljx6xlea4se1",
                    "name": "SPEAKER ACCEPTANCE"
                }, {"id": "kix.45jds6bgf7k1", "name": "Instructions - short"}, {
                    "id": "id.ae02c59swzm6",
                    "name": "UPLOAD REMINDER"
                }, {"id": "id.dewh8atlpnji", "name": "REVIEWER INVITATION"}, {
                    "id": "id.3cg88ustwldr",
                    "name": "REHEARSAL INVITATION"
                }, {"id": "id.4vf9jamyqcph", "name": "Requesting Approval on CDS"}, {
                    "id": "id.5xc5jgyq9lkl",
                    "name": "Proceedings Preparation Instructions"
                }, {"id": "id.83uc3f36b47g", "name": "Proceedings Preparation Reminder"}, {
                    "id": "id.w4ydzzdxrzss",
                    "name": "Reviewer Reminder for Proceedings"
                }, {"id": "id.2hm4uruu5dyq", "name": "Request for updated information"}, {
                    "id": "id.grfx2njfiscl",
                    "name": "Copyright Alert"
                }]);
            },
            getTemplate: function (doc_id, bookmark_id) {
                console.log('getTempalte', doc_id, bookmark_id);
                this.callback({
                    "body": "Dear <AUTHOR>,\n\nThe <CONFERENCE TITLE> is approaching and your conference contribution should be submitted to CDS as \"COM\". Please also request approval as “SLIDE” in CDS, though the final approval will be given after the end of the conference.\n\nIt is very important that you have the sign-off from your institute and Institute Representative who will have to make a comment in the CDS discussion tab that he has signed off on your contribution! Without this, the reviewal process won’t start and might cause a severe delay. \n\nThe contribution will then be internally reviewed by TDAQ and signed off for the conference. You can find detailed instructions at:\nhttps://twiki.cern.ch/twiki/bin/view/Atlas/TDAQSpeakersCommitteeConferenceInstructions\n\nThank you very much in advance for respecting the deadlines.\n\t\t\nBest regards,\n<NAME>\non behalf of the TDAQ Speakers Committee",
                    "subject": "<TALK/POSTER> for <CONFERENCE TITLE> in CDS "
                });
            },
            getSheetTabs: function (sheet_id) {
                console.log('getSheetTabs', sheet_id);
                this.callback([{"id": 413577333, "name": "Recipients"}, {"id": 0, "name": "Replacements"}]);
            },
            getReplacements: function (sheet_id, tab_id) {
                console.log('getReplacements', sheet_id, tab_id);
                this.callback([{
                    "type": "normal",
                    "search": "<TALK/POSTER>",
                    "replace_to": "Talk"
                }, {
                    "type": "normal",
                    "search": "<INT DEADLINE>",
                    "replace_to": "15-12-2016"
                }, {
                    "type": "normal",
                    "search": "<NAME>",
                    "replace_to": "E-mail author"
                }, {
                    "type": "full-name",
                    "search": "<AUTHOR>",
                    "replace_to": ""
                }, {
                    "type": "normal",
                    "search": "<CONFERENCE TITLE>",
                    "replace_to": "VITC"
                }]);
            },
            getRecipients: function (sheet_id, tab_id) {
                console.log('getRecipients', sheet_id, tab_id);
                this.callback([{
                    "email": "kowalczyk@gmail.com",
                    "full_name": "Jan Kowalczyk"
                }, {"email": "kolwalczyk@o2.pl", "full_name": "Janusz Kowalski"}]);
            },
            getCCs: function (sheet_id, tab_id) {
                console.log('getCCs', sheet_id, tab_id);
                this.callback([{"cc": "mail189@gmail.com"}, {"cc": "mali02k09@o2.pl"}]);
            },
            sendMails(arr) {
                console.log('sendEmails', arr);
                if (Math.random() > 0.5) {
                    this.callback();
                } else {
                    this.failureCallback();
                }
            }
        }
    }
};
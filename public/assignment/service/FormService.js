(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){
        var forms = [];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }

        return service;

        function createFormForUser(userId, form, callback){
            form.id = Guid.create().value;
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback){
            var userForms = [];
            for(var index in forms){
                if(forms[index].userId === userId){
                    userForms.push(forms[index]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback){
            for(var index in forms){
                if( forms[index].id === formId){
                    forms.splice(index, 1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            for(var index in forms){
                if(forms[index].id === formId){
                    forms[index].userId = newForm.userId;
                    forms[index].name = newForm.name;
                }
            }
            callback(forms[index]);
        }
    }

})();
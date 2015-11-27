module.exports = function(app){
    var forms = require("./form.mock.json");
    var uuid = require("node-uuid");

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findFieldsForForm: findFieldsForForm,
        createFieldForForm: createFieldForForm,
        deleteFieldForForm: deleteFieldForForm
    };

    return api;

    function findFormByTitle(title){
        existForm = null;
        for(var index in forms){
            if(forms[index].title === title){
                existForm = forms[index];
            }
        }
        return existForm;
    }

    function findAllFormsForUser(userId){
        var userForms = [];
        for(var index in forms){
            if(forms[index].userId === userId){
                userForms.push(forms[index]);
            }
        }
        return userForms;
    }

    function createFormForUser(userId, form){
        form.id = uuid.v1();
        form.userId = userId;
        forms.push(form);
        userForms = findAllFormsForUser(userId);
        return userForms;
    }

    function deleteFormById(formId){
        for(var index in forms){
            if( forms[index].id === formId){
                var curUserId = forms[index].userId
                forms.splice(index, 1);
            }
        }
        return findAllFormsForUser(curUserId);
    }

    function updateFormById(formId, newForm){
        for(var index in forms){
            if(forms[index].id === formId){
                forms[index].userId = newForm.userId;
                forms[index].title = newForm.title;
            }
        }
        return findAllFormsForUser(newForm.userId);
    }

    function findFieldsForForm(formId){
        for(var index in forms){
            if(forms[index].id === formId){
                var fields = forms[index].fields;
                return fields;
            }
        }
        return null;
    }

    function createFieldForForm(formId, newField){
        newField.id = uuid.v1();

        for(var index in forms){
            if(forms[index].id === formId){
                forms[index].fields.push(newField);
                return forms[index].fields;
            }
        }
        return null;
    }

    function deleteFieldForForm(formId, fieldId){
        for(var index in forms){
            if(forms[index].id === formId){
                for(var i in forms[index].fields){
                    if(forms[index].fields[i].id === fieldId){
                        forms[index].fields.splice(i, 1);
                        return  forms[index].fields;
                    }
                }
            }
        }
        return null;
    }
}
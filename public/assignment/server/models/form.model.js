module.exports = function(app){
    var forms = require("./form.mock.json");
    var uuid = require("node-uuid");

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle
    };

    return api;

    function findFormByTitle(title){
        existForm = null;
        for index in forms{
            if forms[index].title === title{
                existForm = forms[index];
            }
        }
        return existForm;
    }

    function createFormForUser(userId, form){
        form.id = uuid.v1();
        form.userId = userId;
        forms.push(form);
        return form;
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

    function deleteFormById(formId){
        for(var index in forms){
            if( forms[index].id === formId){
                forms.splice(index, 1);
            }
        }
        return forms;
    }

    function updateFormById(formId, newForm){
        for(var index in forms){
            if(forms[index].id === formId){
                forms[index].userId = newForm.userId;
                forms[index].title = newForm.title;
            }
        }
        return forms[index];
    }
}
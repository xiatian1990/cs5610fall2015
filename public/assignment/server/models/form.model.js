var forms = require("./form.mock.json");
var uuid = require("node-uuid");
var Q = require("q");

module.exports = function(app, mongoose, db){

    var formSchema = require("./form.schema.js")(mongoose);
    var formModel = mongoose.model("formModel", formSchema);

    //init forms mock to Mongodb
    for(var index in forms){
        initFormToDB(forms[index]);
    }

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

    function initFormToDB(form){
        var deferred = Q.defer();
        formModel.find({id: form.id}, function(err, forms){
            if (forms.length > 0){
                console.log("form already exists")
            }else{
                formModel.create(form, function(err, form){
                    deferred.resolve(form);
                });
            }
        });
    }

    function findFormByTitle(title){
        var deferred = Q.defer();

        formModel.findOne({title: title}, function(err, foundForm){
            deferred.resolve(foundForm);
        });
        return deferred.promise;
    }

    function findAllFormsForUser(userId){
        var deferred = Q.defer();

        formModel.find({userId: userId}, function(err, forms){
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    function createFormForUser(userId, form){
        var deferred = Q.defer();

        form.id = uuid.v1();
        form.userId = userId;

        formModel.create(form, function(err, forms){
            deferred.resolve(forms);
        });

        var userForms = findAllFormsForUser(userId);
        return userForms;
    }

    function deleteFormById(formId){
        var deferred = Q.defer();

        formModel.findOne({id: formId}, function(err, form){
            if (! err){
                formModel.remove({id: formId}, function(err, status){
                    console.log(err);
                });
                formModel.find({userId: form.userId}, function(err, forms){
                    deferred.resolve(forms);
                });
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, newForm){
        var deferred = Q.defer();

        formModel.findOne({id: formId}, function(err, foundForm){
            if(foundForm && newForm){
                for (var key in newForm){
                    foundForm[key] = newForm[key];
                }

                foundForm.save(function(err, foundForm){
                    formModel.find({userId: foundForm.userId}, function(err, forms){
                        deferred.resolve(forms);
                    })
                })
            }
        });
        return deferred.promise;
    }

    function findFieldsForForm(formId){
        var deferred = Q.defer();

        formModel.findOne({id: formId}, function(err, form){
            deferred.resolve(form.fields);
        });
        return deferred.promise;
    }

    function createFieldForForm(formId, newField){
        var deferred = Q.defer();
        newField.id = uuid.v1();

        formModel.findOne({id: formId}, function(err, form){
            form.fields.push(newField);
            form.save(function(err, form){
                deferred.resolve(form.fields);
            });
        });
        return deferred.promise;
    }

    function deleteFieldForForm(formId, fieldId){
        var deferred = Q.defer();
        formModel.findOne({id: formId}, function(err, form){
            for (var index in form.fields){
                if (form.fields[index].id === fieldId){
                    form.fields.splice(index, 1);
                }
            }
            form.save(function(err, form){
                deferred.resolve(form.fields);
            });
        });
        return deferred.promise;
    }
}
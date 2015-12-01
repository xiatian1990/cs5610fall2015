(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController)

    function FieldController($scope, $rootScope, $location, FieldService){
        $scope.location = $location;
        $scope.addField = addField;
        $scope.removeField = removeField
        //$scope.updateForm = updateForm;
        $scope.typeTemplates = [
            {
                id: null,
                label: "Single Line Text Field",
                type: "TEXT",
                placeholder: "New Field"
            },
            {
                id: null,
                label: "Multi Line Text Field",
                type: "TEXTAREA",
                placeholder: "New Field"
            },
            {
                id: null,
                label: "Date Field",
                type: "DATE",
            },
            {
                id: null,
                label: "Dropdown Field",
                type: "OPTIONS",
                options:[
                    {
                        label: "Option1",
                        value: "OPTION_1"
                    },
                    {
                        label: "Option2",
                        value: "OPTION_2"
                    },
                    {
                        label: "Option3",
                        value: "OPTION_3"
                    }
                ]
            },
            {
                id: null,
                label: "Checkboxes Field",
                type: "CHECKBOXES",
                options:[
                    {
                        label: "OptionA",
                        value: "OPTION_A"
                    },
                    {
                        label: "OptionB",
                        value: "OPTION_B"
                    },
                    {
                        label: "OptionC",
                        value: "OPTION_C"
                    }
                ]
            },
            {
                id: null,
                label: "Radio Buttons Field",
                type: "RADIOS",
                options:[
                    {
                        label: "OptionX",
                        value: "OPTION_X"
                    },
                    {
                        label: "OptionY",
                        value: "OPTION_Y"
                    },
                    {
                        label: "OptionZ",
                        value: "OPTION_Z"
                    }
                ]
            }
        ]

        var currentUser = $rootScope.currentUser;
        var currentForm = $rootScope.currentForm;

        FieldService.getFieldsForForm(currentForm.id)
            .then(function(fields){
                $scope.fields = fields;
            });

        function addField(newField){
            if(newField){
                FieldService.createFieldForForm(
                    currentForm.id,
                    newField
                ).then(
                    function(fields){
                        $scope.fields = fields;
                    }
                );
            }else{
                alert("Please select a field type.")
            }
        }

        function removeField(field){
            FieldService.deleteFieldForForm(currentForm.id, field.id)
                .then(
                    function(fields){
                        $scope.fields = fields;
                    }
                )
        }
    }
})();
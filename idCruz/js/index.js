import {appendTeacher,getTeachers,removeTeacher,findTeacher,updateTeacher} from './Utility.js'

window.onload = function () {
   
    var btnAdd = document.querySelector("#btn-add"),
    index = null;

    btnAdd.addEventListener('click', function () {
        saveData(null)
    });
    loadData(getTeachers());

    const getForm= () =>{
        let plus = 0;
        var name = document.getElementById("name"),
        lastname = document.getElementById("lastname"),
        age = document.getElementById("age"),
        year = document.getElementById("year"),
        specialty = document.getElementById("specialty"),
        linkedin = document.getElementById("linkedin");
        var text= specialty.options[specialty.selectedIndex].text;
        console.log(specialty.value)
        if(name.value.lenght ==0){
            alert("El nombre es oligatorio")
            return null;
        }
        if(lastname.value.lenght==0){
            alert("El apellido es oligatorio")
            return null;
        }
        if(!parseInt(age.value)){
            alert("La edad ingresada no es valida")
            return null;
        }
        if(!parseInt(specialty.value)){
            alert("La especialidad es oligatorio")
            return null;
        }
        if(!parseInt(year.value)){
            alert("El año  ingresado no es valido")
            return null;
        }
        if(linkedin.value.lenght!=0){
            plus +=10;
        }
        plus = plus + (year.value*specialty.value)
        return ({
            name: name.value,
            lastname: lastname.value,
            age: age.value,
            year: year.value,
            specialty:specialty.value,
            specialtyName:text,
            linkedin: linkedin.value,
            indice:plus
        })
    };
    const saveData = () => {
        const teacher = getForm();
        if(teacher==null) return;
        index !=null?updateData():appendTeacher(teacher);
        console.log("listado",getTeachers())
        loadData(getTeachers());
    }

    function loadData(data) {
        var songs = data, gridBody = document.querySelector("#grid tbody");
        // Draw TR from TBODY
        gridBody.innerHTML = '';
        songs.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdname = document.createElement("td"),
                tdspecialty = document.createElement("td"),
                tdindice = document.createElement("td"),
                tdRemove = document.createElement("td"),
                tdEdit = document.createElement("td"),
                btnRemove = document.createElement("button"),
                btnPlus = document.createElement("button"),
                btnMin = document.createElement("button"),
                iconShow = document.createElement("i"),
                iconSave = document.createElement("i"),
                iconDelete = document.createElement("i");

            //icons
            iconShow.className = "bi bi-plus"
            iconSave.className = "bi bi-dash"
            iconDelete.className = "bi bi-trash"
            //inputs
            tdname.textContent = x.name+" "+x.lastname;
            tdspecialty.textContent = x.specialtyName;
            tdindice.textContent = x.indice;


            btnRemove.className = 'btn btn-sm btn-danger mr-1';
            btnRemove.addEventListener('click', function(){
                removeData(i);
            });
            btnRemove.appendChild(iconDelete);
            btnPlus.className = 'btn btn-sm btn-success mr-1';
            btnPlus.addEventListener('click', function(){
                updateData(i,true)
            });
            btnPlus.appendChild(iconSave);
            btnMin.className = 'btn btn-sm btn-info mr-1';
            btnMin.addEventListener('click', function(){
                updateData(i,false)
            });
            btnMin.appendChild(iconShow);
            tdRemove.appendChild(btnPlus);
            tdRemove.appendChild(btnRemove);
            tdRemove.appendChild(btnMin);
            tr.appendChild(tdname);
            tr.appendChild(tdspecialty);
            tr.appendChild(tdindice);
            tr.appendChild(tdRemove);
            gridBody.appendChild(tr);
        });
    }
    const removeData = (i) => {
        if(removeTeacher(i)){
            loadData(getTeachers());
        }
    }

    const updateData = (index,accion) => {
        var teacher = findTeacher(index)
        let lindice = teacher.indice;
        teacher.indice = accion?lindice + (lindice*0.10):lindice - (lindice*0.10)
        console.log(teacher)
        updateTeacher(index,teacher);
        loadData(getTeachers());
    }
}
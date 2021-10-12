
const  localStorageKeyName = 'teachers';
export const appendTeacher = (obj) =>{
    var teachers = getTeachers();
    teachers.push(obj);
    localStorage.setItem(localStorageKeyName, JSON.stringify(teachers));
    return true;
}

export const removeTeacher = (index)=>{
    var teachers = getTeachers();
    teachers.splice(index, 1);
    localStorage.setItem(localStorageKeyName, JSON.stringify(teachers));
    return true;
}
export const getTeachers = ()=>{
    var teachers = [], dataInLocalStorage = localStorage.getItem(localStorageKeyName);
    if (dataInLocalStorage !== null) {
        teachers = JSON.parse(dataInLocalStorage);
    }
    return teachers;
}
export const findTeacher = (index)=>{
    const teachers = getTeachers();
    const teacher = teachers[index];
    return teacher;
}
export const updateTeacher=(index,teacher)=>{
    var teachers = getTeachers();
    var foundteacher = teachers[index];
    teachers[index].title = teacher.title;
    teachers[index].singer = teacher.singer;
    teachers[index].price = teacher.price;
    teachers[index].country = teacher.country;
    teachers[index].url = teacher.url;
    localStorage.setItem(localStorageKeyName, JSON.stringify(teachers));
    return foundteacher;
}
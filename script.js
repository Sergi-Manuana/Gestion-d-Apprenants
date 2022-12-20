// recuperation des information 

let newname= document.getElementById("newname")
let newlastname= document.getElementById("newlastname")
let newfirstname= document.getElementById("newfirstname")
let newcountry= document.querySelector("#newcountry")
let newgender= document.querySelector("#gender")
let newgit=document.getElementById("newgit")
let formulaire = document.getElementById("form")
let tableBody = document.querySelector('table tbody')
let submitBtn = document.getElementById('btnsubmit')

let learnerDeletednom = null
let learnerDeletedpost = null
let learnerDeletedpre  = null
let learnerDeletedpays = null
let learnerDeletedgenre = null
let learnerDeletedgit = null

let editionLearner = null
let editMode = false

editModeEnabled(editMode)


let learners = []

function loadLearnerInTable(){
        tableBody.innerHTML=''

        for (const leaner of learners){
            let model= `<tr>
            <td>${leaner.nom}</td>
            <td>${leaner.postnom}</td>
            <td>${leaner.prenom}</td>
            <td >${leaner.pays}</td>
            <td>${leaner.genre}</td>
            <td>${leaner.github}</td>
            <td>
                <button onclick="deleteLearner(this)" data-nom="${leaner.nom}" data-postnom="${leaner.postnom}" data-prenom="${leaner.prenom}" data-pays="${leaner.pays}" data-genre="${leaner.genre}" data-github="${leaner.github}" >Supprimmer</button>
                <button data-nom="${leaner.nom}" data-postnom="${leaner.postnom}" data-prenom="${leaner.prenom}" data-pays="${leaner.pays}" data-genre="${leaner.genre}" data-github="${leaner.github}" onclick="editLearner(this)">Modifier</button>
            </td>
        </tr>`

        tableBody.innerHTML+= model
        }

}

loadLearnerInTable()
 

form.addEventListener('submit', function(e){
    e.preventDefault();

    form_verify();
})

// Fonctions

function form_verify(){
    let newnameValue = newname.value
    let newfirstnameValue= newfirstname.value
    let newlastnameValue = newlastname.value
    let newcountryValue= newcountry.options[newcountry.selectedIndex].label
    let newgenderValue=  newgender.options[newgender.selectedIndex].label
    let newgitValue=newgit.value 
    if (editMode){
        if ((newnameValue=="")||(newfirstnameValue=="")||(newlastnameValue=="")||(newcountryValue=="")||(newgenderValue=="")||(newgitValue=="")){
            
        } else{
            updateLeaner(newnameValue,newfirstnameValue,newlastnameValue,newcountryValue,newgenderValue,newgitValue)

        }
       
    } else {
        if ((newnameValue=="")||(newfirstnameValue=="")||(newlastnameValue=="")||(newcountryValue=="")||(newgenderValue=="")||(newgitValue=="")){
           } else{
            addLearner(newnameValue,newfirstnameValue,newlastnameValue,newcountryValue,newgenderValue,newgitValue)

        }
    }


}
    

function addLearner (){
    

    let newleaner = {
    'nom': newname.value,
    'postnom': newlastname.value,
    'prenom': newfirstname.value,
    'pays':newcountry.options[newcountry.selectedIndex].label,
    'genre': newgender.options[newgender.selectedIndex].label,
    'github':newgit.value 

    };

    learners.push(newleaner);
    loadLearnerInTable()
    newname.value=''
    newlastname.value=''
    newfirstname.value=''
    newcountry.selectedIndex=0
    newgender.selectedIndex=0
    newgit.value =''
}

function updateLeaner (){
    learners.find((s) => s.nom == editionLearner.nom).nom = newname.value
    learners.find((s) => s.nom == editionLearner.nom).postnom =  newlastname.value
    learners.find((s) => s.nom == editionLearner.nom).prenom=  newfirstname.value
    learners.find((s) => s.nom == editionLearner.nom).pays =  newcountry.options[newcountry.selectedIndex].label
    learners.find((s) => s.nom == editionLearner.nom).genre =   newgender.options[newgender.selectedIndex].label
    learners.find((s) => s.nom == editionLearner.nom).github =  newgit.value

    loadLearnerInTable()

    editModeEnabled(false)
}

function deleteLearner(e){
    e.parentNode.parentNode.remove()

    newname.value=e.dataset.nom
    newlastname.value=e.dataset.postnom
    newfirstname.value=e.dataset.prenom
    newcountry.options[newcountry.selectedIndex].label=e.dataset.pays
    newgender.options[newgender.selectedIndex].label=e.dataset.genre
    newgit.value =e.dataset.github
    learnerDeletednom=learners.find((t) => t.nom == e.dataset.nom).nom
    learnerDeletedpost= learners.find((t) => t.nom == e.dataset.nom).postnom
    learnerDeletedpre= learners.find((t) => t.nom == e.dataset.nom).prenom
    learnerDeletedpays= learners.find((t) => t.nom == e.dataset.nom).pays
    learnerDeletedgenre= learners.find((t) => t.nom == e.dataset.nom).genre
    learnerDeletedgit= learners.find((t) => t.nom == e.dataset.nom).github

    
    let learnertodelete = {
    'nom': learnerDeletednom,
    'postnom': learnerDeletedpost,
    'prenom': learnerDeletedpre,
    'pays':learnerDeletedpays,
    'genre':learnerDeletedgenre,
    'github':learnerDeletedgit 
    };

   for (const learnr of learners) {
        if (learnertodelete.nom==learnr.nom){
            learners.splice(learners.indexOf(lrnr),1)
        }

        newname.value=''
        newlastname.value=''
        newfirstname.value=''
        newcountry.options[newcountry.selectedIndex].label=''
        newgender.options[newgender.selectedIndex].label=''
        newgit.value =''
    
   }


    newname.value=''
    newlastname.value=''
    newfirstname.value=''
    newcountry.options[newcountry.selectedIndex].label=''
    newgender.options[newgender.selectedIndex].label=''
    newgit.value =''
    learnerDeletednom= null
    learnerDeletedpost= null
    learnerDeletedpre= null
    learnerDeletedpays= null
    learnerDeletedgenre= null
    learnerDeletedgit= null

   
   
}


function editLearner(e) {
    editModeEnabled(true)
        newname.value=e.dataset.nom
        newlastname.value=e.dataset.postnom
        newfirstname.value=e.dataset.prenom
        newcountry.options[newcountry.selectedIndex].label=e.dataset.pays
        newgender.options[newgender.selectedIndex].label=e.dataset.genre
        newgit.value =e.dataset.github
    editionLearner = learners.find((t) => t.nom == e.dataset.nom)
console.log (editionLearner)

}

function editModeEnabled(enabled) {
    if(enabled) {
        editMode = true
        submitBtn.innerText = "Modifier"
    } else {
        editMode = false
        submitBtn.innerText = "Ajouter"
        editionLearner = null
        newname.value=''
        newlastname.value=''
        newfirstname.value=''
        newcountry.options[newcountry.selectedIndex].label=''
        newgender.options[newgender.selectedIndex].label=''
        newgit.value =''
    }
}

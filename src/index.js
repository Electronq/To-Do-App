import './styles.css'

// hook
const cardHolder = document.querySelector('.content-card') 
const addBtn = document.querySelector('.add')
const openModalBtn = document.querySelector('.addProj')
const closeModalBtn = document.querySelector('.cancel')
const addNewProjBtn = document.querySelector('.newProj')





class Task{
    constructor(taskName,taskDesc,taskPriority,taskDueDate){
        this.taskName = taskName;
        this.taskDesc = taskDesc;
        this.taskPriority = taskPriority;
        this.taskDueDate = taskDueDate;
    }

}

class Project{
    constructor(){}
}

let projectList = {}

const computer = (()=>{

    let currentProject = 'default'
    
    addBtn.addEventListener('click',()=>{
        todo.save('default','',currentProject)
        updateEventListener();
        console.log(projectList)

    });

    addNewProjBtn.addEventListener('click',()=>{
        const boxInput = document.querySelector('#projectname')
        todo.saveProj(boxInput.value)
        currentProject = boxInput.value;
        
    })

    

    openModalBtn.addEventListener('click', ()=>{
        display.openModal()
    });

    closeModalBtn.addEventListener('click',()=>{
        display.closeModal()
    })

    const updateEventListener = ()=>{
        const title = document.querySelectorAll('.title')
        title.forEach((value)=>{
            if(value.getAttribute('listener') !== 'true'){
                const parent = value.parentNode;
                const grandParent = parent.parentNode;
                const pos = Array.prototype.indexOf.call(grandParent.children,parent)
                value.setAttribute('listener','true')
                value.addEventListener('focusout',()=>{
                    todo.save('custom',pos,currentProject)
                })
            }
        })

        const desc = document.querySelectorAll('.desc')
        desc.forEach((value)=>{
            if(value.getAttribute('listener') !== 'true'){
                const parent = value.parentNode;
                const grandParent = parent.parentNode;
                const pos = Array.prototype.indexOf.call(grandParent.children,parent)
                value.setAttribute('listener','true')
                value.addEventListener('focusout',()=>{
                    todo.save('custom',pos,currentProject)
                    console.log(pos)
                })
            }
        })

        const status = document.querySelectorAll('.status')
        status.forEach((value)=>{
            if(value.getAttribute('listener') !== 'true'){
                const parent = value.parentNode.parentNode;
                const grandParent = parent.parentNode;
                const pos = Array.prototype.indexOf.call(grandParent.children,parent)
                value.setAttribute('listener','true')
                value.addEventListener('click',()=>{
                    todo.save('status',pos,currentProject)
                    console.log(pos)
                })
            }
        })

        const dueDate = document.querySelectorAll('#taskDate')
        dueDate.forEach((value)=>{
            if(value.getAttribute('listener') !== 'true'){
                const parent = value.parentNode.parentNode;
                const grandParent = parent.parentNode;
                const pos = Array.prototype.indexOf.call(grandParent.children,parent)
                value.setAttribute('listener','true')
                value.addEventListener('focusout',()=>{
                    todo.save('custom',pos,currentProject)
                    console.log(pos)
                })
            }
        })

        const del = document.querySelectorAll('.del')
        del.forEach((value)=>{
            if(value.getAttribute('listener') !== 'true'){
                const parent = value.parentNode.parentNode;
                const grandParent = parent.parentNode;
                const pos = Array.prototype.indexOf.call(grandParent.children,parent)
                value.setAttribute('listener','true')
                value.addEventListener('click',()=>{
                    todo.remove(pos,currentProject)
                })
            }
        })

        const projCardBtn = document.querySelectorAll('.projCard')
        projCardBtn.forEach((value)=>{
            if(value.getAttribute('listener') !== 'true'){
                const parent = value.parentNode.parentNode;
                const grandParent = parent.parentNode;
                const pos = Array.prototype.indexOf.call(grandParent.children,parent)
                value.setAttribute('listener','true')
                value.addEventListener('click',()=>{
                    currentProject = value.childNodes[0].textContent
                    display.update(currentProject,value)
                    if(!value.children[0]){
                        dom.addActionBar(value)
                    }
                    
                })
                value.addEventListener('blur',()=>{
                    if(value.children[0]){
                        value.removeChild(value.children[0])
                    }
    
                })
            }

        })

        // const editProjCard = document.querySelectorAll('.editCard')
        
        // editProjCard.forEach((value)=>{
        //     const grandParent = value.parentNode.parentNode.parentNode
        //     const parent = value.parentNode.parentNode
        //     value.addEventListener('click', ()=>{
        //         console.log(value)

        //     })
        // })


    }
    let count = 0

    const changeStatus  = ()=>{
        if(count == 0){
            count++
            return 'Priority'
            
        }
        if(count == 1){
            count++
            return 'Pending'
            
        }
        if(count == 2){
            count = 0
            return 'Done'
        }

    }



    const saveOnLocalStorage = () =>{
        localStorage.setItem('tasklist',JSON.stringify(projectList))
    }

    const getFromLocalStorage = () =>{
        const temp = localStorage.getItem('tasklist')
        projectList = JSON.parse(temp)
    }

    return{updateEventListener,changeStatus,saveOnLocalStorage,getFromLocalStorage}

})();

const loadSavedTask = ()=>{
    if(localStorage.tasklist){
        computer.getFromLocalStorage()
        const firstProj = Object.keys(projectList)[0]
        display.update(firstProj)
        display.updateProj()
        console.log('loaded')
    }
}

const createDefaultProj = ()=>{
    if(Object.keys(projectList).length == 0){ //if projectlist empty
        todo.saveProj('Default Project')
    } 

}





const todo = (()=>{
    const save = (type,cardPosition,proj)=>{

        if(type == 'default'){
            const memoryEnd = Object.keys(projectList[proj]).length
                const title = 'Note title here...'
                const desc = 'Enter your note description here ...'
                const status = 'Status'
                const date = ''
        
        
                const toDo = new Task(title,desc,status,date)
               
                projectList[proj][memoryEnd] = toDo
                
        } else if(type == 'custom'){
            const title = cardHolder.children[cardPosition].firstElementChild.textContent
            const desc = cardHolder.children[cardPosition].children[1].textContent
            const status = cardHolder.children[cardPosition].children[2].children[0].textContent
            const date = cardHolder.children[cardPosition].children[2].children[1].value


            const toDo = new Task(title,desc,status,date)
            projectList[proj][cardPosition-1] = toDo;
            console.log(projectList)
            

        } else if(type == 'status'){
            const title = cardHolder.children[cardPosition].firstElementChild.textContent
            const desc = cardHolder.children[cardPosition].children[1].textContent
            const status = computer.changeStatus()
            const date = cardHolder.children[cardPosition].children[2].children[1].value


            const toDo = new Task(title,desc,status,date)
            projectList[proj][cardPosition-1] = toDo;
            console.log(projectList)
            

        } 
        computer.saveOnLocalStorage()
        computer.getFromLocalStorage()
        display.update(proj)
        
        
    }

    const saveProj = (projectName)=>{
        if(!projectName == ''){
            const projectArray = Object.keys(projectList)
            if(projectArray.includes(projectName)){
                alert('This project name already exists, please choose another one.')
            } else{
                const project = new Project()
                projectList[projectName] = project
                computer.saveOnLocalStorage()
                computer.getFromLocalStorage()
                display.update(projectName)
                display.updateProj()
                display.closeModal()

            }

        }
    }


    
    const remove = (cardPosition,proj)=>{
        const cardPosMinOne = cardPosition-1
        const projectArray = Object.values(projectList[proj])
        projectArray.splice(cardPosMinOne,1)
        projectList[proj] = {}
        projectArray.forEach((value,index)=>{
            projectList[proj][index] = value;
        })

        computer.saveOnLocalStorage()
        computer.getFromLocalStorage()
        console.log(projectList)
        display.update(proj)
    }

    const removeProj = (projectName,pos)=>{
        
        delete projectList[projectName]
        console.log(projectList)
        computer.saveOnLocalStorage()
        computer.getFromLocalStorage()
        display.updateProj()


    }
    return{save,remove,saveProj,removeProj}

})();

const display = (()=>{
    const modalWindow = document.querySelector('.mainmodal')

    const update = (project)=>{
        removeAll('content')
        if(!Object.keys(projectList).length == 0){
            const memoryLength = Object.keys(projectList[project]).length
            for (let i = 0; i < memoryLength; i++) {
                dom.createCard(
                    projectList[project][i].taskName,
                    projectList[project][i].taskDesc,
                    projectList[project][i].taskPriority,
                    projectList[project][i].taskDueDate,
                )
    
            }
            computer.updateEventListener();

        }

    }

    const updateProj = () => {
        removeAll('navbar')
        const projectListArray = Object.keys(projectList)
        projectListArray.forEach((value)=>{
            dom.createProjectCard(value)
        })
        computer.updateEventListener()

    }

    const removeAll = (type)=>{
        if(type == 'content'){
            const child = document.querySelectorAll('.task');
            child.forEach((children)=>{
                children.parentNode.removeChild(children)
            })
        }

        if(type == 'navbar'){
            const projectCard = document.querySelectorAll('.projCard')
            projectCard.forEach((children)=>{
                children.parentNode.removeChild(children)
            })
        }

    }

    const openModal = ()=>{
        modalWindow.style.display = 'block';
    }
    const closeModal = ()=>{
        modalWindow.style.display = 'none';
    }
    return{update, openModal,closeModal, updateProj}

})();

const dom = (()=>{
    const createCard = (title,desc,status,date)=>{
            const cardParent = document.createElement('div')
            const cardTitle = document.createElement('div')
            const cardDesc = document.createElement('div')
            const actionBar = document.createElement('div')
            const cardStatus = document.createElement('div')
            const delButton = document.createElement('div')
            const cardDate = document.createElement('input')
    
            cardParent.classList.add('task')
    
            cardTitle.classList.add('title')
            cardTitle.textContent = title
            cardTitle.setAttribute('contenteditable','true')
    
            cardDesc.classList.add('desc')
            cardDesc.textContent = desc
            cardDesc.setAttribute('contenteditable','true')
    
            actionBar.classList.add('actionBtn')
    
            cardStatus.classList.add('status')
            cardStatus.textContent = status
            if(status == 'Priority'){
                cardStatus.setAttribute('id','red')
            }
            if(status == 'Pending'){
                cardStatus.setAttribute('id','grey')
            }
            if(status == 'Done'){
                cardStatus.setAttribute('id','green')
            }
    
            delButton.classList.add('del')
            delButton.textContent = 'X'
    
            cardDate.setAttribute('id','taskDate')
            cardDate.setAttribute('type','date')
            cardDate.value = date
    
            // append
            cardHolder.appendChild(cardParent)
            cardParent.appendChild(cardTitle)
            cardParent.appendChild(cardDesc)
            cardParent.appendChild(actionBar)
            actionBar.appendChild(cardStatus)
            actionBar.appendChild(cardDate)
            actionBar.appendChild(delButton)
    }

    const createProjectCard = (projectName)=>{
        const projListHook = document.querySelector('.projList')
        const projectCard = document.createElement('div')
        projectCard.textContent = projectName
        projectCard.classList.add('projCard')
        projectCard.setAttribute('tabindex','-1')
        projListHook.appendChild(projectCard)




    }

    const addActionBar = (value)=>{

        const actionBar = document.createElement('div')
        actionBar.classList.add('actionBar');
        const editButton = document.createElement('div')
        editButton.classList.add('editCard')
        editButton.textContent = '✏️'
        const delCard = document.createElement('div')
        delCard.classList.add('delCard')
        delCard.textContent = 'X'

        value.appendChild(actionBar)
        // actionBar.appendChild(editButton)
        actionBar.appendChild(delCard)

        delCard.addEventListener('click',()=>{
            const parent = value.parentNode.children
            const pos = (Array.prototype.indexOf.call(parent,value))
            // console.log(Object.keys(projectList)[0])
            console.log(projectList)
            todo.removeProj(Object.keys(projectList)[pos])
        })
        
    }

    return{createCard,createProjectCard,addActionBar}

})();

loadSavedTask()
createDefaultProj()


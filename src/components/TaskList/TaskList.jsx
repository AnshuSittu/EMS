// Tailwind-only fix: reduce card width so they don't stretch full-bleed on large screens
// Drop-in replacement for your TaskList component (no JS logic changed)
import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import InProgressTask from "./InProgressTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data }) => {
  return (
    <div
      id="tasklist"
      className={`
        mt-8 w-full px-4 py-6

        /* center the scroller area and limit overall page width */
        max-w-7xl mx-auto

        /* mobile-first: stacked list */
        flex flex-col gap-4

        /* tablet+ : horizontal carousel, no wrap */
        sm:flex-row sm:flex-nowrap sm:items-start sm:gap-4

        /* always allow horizontal scrolling if cards overflow */
        overflow-x-auto

        /* smooth snap behavior on larger screens */
        sm:snap-x sm:snap-mandatory

        /* hide scrollbar (WebKit + Firefox) */
        [&::-webkit-scrollbar]:hidden [scrollbar-width:none]

        h-auto
      `}
    >
    {data.tasks.map((elem, idx)=>{
      if(elem.newTask){
        return <NewTask key={idx} data={elem}/>
      }
      if(elem.completed){
        return<CompleteTask key={idx} data={elem}/>
      }
      if(elem.failed){
        return <FailedTask key={idx} data={elem}/>
      }
      if(elem.inProgress){
        return <InProgressTask key={idx} data={elem}/>
      }
    })} 
    
     
    </div>
  );
};

export default TaskList;

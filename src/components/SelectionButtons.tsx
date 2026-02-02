export const SelectionButton = ( {setFlavour})=> {
    return (   <div className='flex flex-row gap-6 w-full justify-center'>
       <button onClick={() =>  setFlavour("שוקולד")}>
        שוקולד
        </button>
      <button onClick={() =>  setFlavour("וניל")}>
        וניל
      </button>
          <button onClick={() =>  setFlavour("תות")}>
        תות
      </button>
      </div>)
}
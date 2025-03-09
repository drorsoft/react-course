import './IceCream.css'

export const IceCream = ({ serveType }) => {

    return (
        <div className={serveType === 'cone' ? 'cone' : 'cup'}></div>
    )
}
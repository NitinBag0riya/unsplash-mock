import './PictureDetails.css';

function PictureDetails({ details }){
    const { alt_description, width, height, user: { username, portfolio_url }  } = details;
    return(
        <div className="picture-container">
            <p>User : <a href={portfolio_url}>{ username }</a></p>
            <p>Dimensions : { width + 'x' + height} </p>
            <p>Description : { alt_description } </p>
            <p></p>
        </div>
    )
}


export default PictureDetails;
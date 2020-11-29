import './EnterReview.css'

function EnterReview() {

  return  (
    <div className = 'review'>
        <h3>Leave a review here!</h3>
        
        <input name = 'review-rating' placeholder = 'Rate your experience from 1 (worst) to 5 (best)' min = {1} max = {5} type = 'number' />

        <input name = 'review-text' placeholder = 'Describe your experience at this hotel' type = 'text' />
      </div>
    )
};

export default EnterReview

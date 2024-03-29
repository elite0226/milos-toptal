import * as Yup from 'yup';

export default Yup.object().shape({
  reviewerId: Yup.string().required('Commenter is required'),
  rating: Yup.number().min(1).max(5).required('Rating is required'),
  visitDate: Yup.date()
    .required('Visit date is required')
    .max(new Date(), 'Visit date cannot be future'),
  comment: Yup.string().required('Comment is required'),
});

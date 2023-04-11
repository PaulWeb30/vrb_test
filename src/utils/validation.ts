import * as yup from 'yup';

export const CreateArticleSchema = yup.object().shape({
	title: yup.string().required('Title required'),
	description: yup.string().required('Description required'),
	author: yup.string().required('Author name is required'),
	// image: yup.mixed().test('fileSize', 'File size is too large', (value) => {
	// 	if (!value) return true;
	// 	return (value as File).size <= 50 * 1024;
	// }),
});

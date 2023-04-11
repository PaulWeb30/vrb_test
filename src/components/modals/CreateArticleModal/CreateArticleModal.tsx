import React from 'react';
import s from './CreateArticleModal.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateArticleSchema } from '../../../utils/validation';
import { IUserArticle } from '../../../@types/article';
import { articleActions } from '../../../redux/slices/article';
import { useActionCreators } from '../../../redux/hooks';

type formType = { title: string; description: string; author: string };

type IProps = {
	setArticles?: (data: IUserArticle[]) => void;
	articles?: IUserArticle[];
	modalHandler: () => void;
};

const CreateArticleModal: React.FC<IProps> = ({ modalHandler }) => {
	const actions = useActionCreators(articleActions);

	const [image, setImage] = React.useState<string>('');

	const createArticleForm = useForm<formType>({
		mode: 'onChange',
		resolver: yupResolver(CreateArticleSchema),
	});

	const onSubmit = (dto: formType) => {
		const newArticle: IUserArticle = {
			id: String(new Date().getTime() / 1000) + Math.random(),
			...dto,
			image,
			authorId: JSON.parse(localStorage.getItem('userId') ?? ''),
		};
		if (image) {
			actions.addUserArticle(newArticle);
			setImage('');
			createArticleForm.reset();
			modalHandler();
		} else {
			alert('Choose image which size less than 350KB');
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		// Роблю цю перевірку, тому що в local Storage не можна зберігати більше 5МБ, бо строка яка генерується є дуже велика, тому потрібно брати картинки з розміром по менше
		if (file && file.size > 350 * 1024) {
			alert('File size should be less than 350KB');
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			const img = e.target?.result;
			setImage(img as string);
		};
		reader.readAsDataURL(file as Blob);
	};

	return (
		<div className={s.modal}>
			<form
				onSubmit={createArticleForm.handleSubmit(onSubmit)}
				className={s.modal_body}
			>
				<span onClick={modalHandler}>X</span>

				<div className="form_field ">
					<label className="form_label" htmlFor="title">
						Title
					</label>
					<div className="form_input">
						<input type="text" {...createArticleForm.register('title')} />
					</div>
					<span className="form_error">
						{createArticleForm.formState.errors.title?.message}
					</span>
				</div>
				<div className="form_field ">
					<label className="form_label" htmlFor="description">
						Description
					</label>
					<div className="form_input">
						<input type="text" {...createArticleForm.register('description')} />
					</div>
					<span className="form_error">
						{createArticleForm.formState.errors.description?.message}
					</span>
				</div>
				<div className="form_field ">
					<label className="form_label" htmlFor="author">
						Author
					</label>
					<div className="form_input">
						<input type="text" {...createArticleForm.register('author')} />
					</div>
					<span className="form_error">
						{createArticleForm.formState.errors.author?.message}
					</span>
				</div>

				<input type="file" onChange={handleFileChange} />
				<button className="form_btn" type="submit">
					Create article
				</button>
			</form>
		</div>
	);
};

export default CreateArticleModal;

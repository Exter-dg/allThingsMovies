import React, { useEffect, useState } from "react";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import RatingStar from "../RatingStar";
import { useParams } from "react-router-dom";
import { deleteReview, getReviewByMovie } from "../../api/review";
import { useAuth, useNotification } from "../../hooks";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import ConfirmModal from "../modals/ConfirmModal";
import NotFound from "../NotFound";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../modals/EditRatingModal";

const getNameInitial = (name = "") => {
	return name[0].toUpperCase();
};

export default function MovieReviews() {
	const [reviews, setReviews] = useState([]);
	const [movieTitle, setMovieTitle] = useState("");
	const [profileOwnersReview, setProfileOwnersReview] = useState(null);
	const [selectedReview, setSelectedReview] = useState(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [busy, setBusy] = useState(false);
	const { movieId } = useParams();
	const { updateNotification } = useNotification();
	const { authInfo } = useAuth();
	const profileId = authInfo.profile?.id;

	const fetchReviews = async () => {
		const { error, movie } = await getReviewByMovie(movieId);
		if (error) return updateNotification("error", error);
		setMovieTitle(movie.title);
		setReviews([...movie.reviews]);
	};

	const findProfileOwnersReview = () => {
		if (profileOwnersReview) return setProfileOwnersReview(null);
		const matched = reviews.find((review) => review.owner.id === profileId);
		if (!matched)
			return updateNotification("error", "You don't have any review");
		setProfileOwnersReview(matched);
	};

	const handleDeleteConfirm = async () => {
		setBusy(true);
		const { error, message } = await deleteReview(profileOwnersReview.id);
		setBusy(false);
		if (error) return updateNotification("error", error);
		updateNotification("success", message);
		const updatedReviews = reviews.filter(
			(r) => r.id !== profileOwnersReview.id
		);
		setReviews([...updatedReviews]);
		setProfileOwnersReview(null);
		hideConfirmModel();
	};

	const hideConfirmModel = () => {
		setShowConfirmModal(false);
	};

	const displayConfirmModal = () => {
		setShowConfirmModal(true);
	};

	const hideEditModal = () => {
		setShowEditModal(false);
		setSelectedReview(null);
	};

	const handleOnEditClick = () => {
		const { id, content, rating } = profileOwnersReview;
		setSelectedReview({ id, content, rating });
		setShowEditModal(true);
	};

	const handleOnReviewUpdate = (review) => {
		const updatedReview = {
			...profileOwnersReview,
			rating: review.rating,
			content: review.content,
		};

		setProfileOwnersReview({ ...updatedReview });
		const newReviews = reviews.map((r) => {
			if (r.id === review.id) return updatedReview;
			else return r;
		});

		setReviews([...newReviews]);
	};

	useEffect(() => {
		if (movieId) fetchReviews();
	}, [movieId]);

	return (
		<div className="dark:bg-primary bg-white min-h-screen pb-10">
			<Container classname="xl:px-0 px-2 py-8">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-semibold dark:text-white text-secondary">
						<span className="text-light-subtle dark:text-dark-subtle font-normal">
							Reviews for:
						</span>
						{movieTitle}
					</h1>

					{profileId ? (
						<CustomButtonLink
							label={profileOwnersReview ? "View All" : "Find My Review"}
							onClick={findProfileOwnersReview}></CustomButtonLink>
					) : null}
				</div>

				<NotFoundText
					text="No Reviews!"
					visible={!reviews.length}></NotFoundText>

				{profileOwnersReview ? (
					<div>
						<ReviewCard review={profileOwnersReview}></ReviewCard>
						<div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
							<button type="button" onClick={displayConfirmModal}>
								<BsTrash></BsTrash>
							</button>
							<button onClick={handleOnEditClick} type="button">
								<BsPencilSquare></BsPencilSquare>
							</button>
						</div>
					</div>
				) : (
					<div className="space-y-3 mt-3">
						{reviews.map((review) => {
							return <ReviewCard review={review} key={review.id}></ReviewCard>;
						})}
					</div>
				)}
			</Container>
			<ConfirmModal
				busy={busy}
				visible={showConfirmModal}
				onCancel={hideConfirmModel}
				onConfirm={handleDeleteConfirm}
				title="Are you sure?"
				subtitle="This action will remove this review permanently"></ConfirmModal>
			<EditRatingModal
				visible={showEditModal}
				initialState={selectedReview}
				onClose={hideEditModal}
				onSuccess={handleOnReviewUpdate}></EditRatingModal>
		</div>
	);
}

const ReviewCard = (review) => {
	if (!review) return null;
	const { owner, content, rating } = review;

	return (
		<div className="flex space-x-3">
			<div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
				{getNameInitial(owner.name)}
			</div>
			<div>
				<h1 className="dark:text-white text-secondary font-semibold text-lg">
					{owner.name}
				</h1>
				<RatingStar rating={rating}></RatingStar>
				<p className="text-light-subtle dark:text-dark-subtle">{content}</p>
			</div>
		</div>
	);
};

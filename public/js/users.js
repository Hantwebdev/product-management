
// Gửi yêu cầu kb
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
	listBtnAddFriend.forEach((button) => {
		button.addEventListener("click", () => {
			button.closest(".box-user").classList.add("add");

			const userId = button.getAttribute("btn-add-friend");

			socket.emit("CLIENT_ADD_FRIEND", userId);
		});
	});
}
// Hết Gửi yêu cầu kb

// ------------------------------------

// Huỷ yêu cầu kb
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
	listBtnCancelFriend.forEach((button) => {
		button.addEventListener("click", () => {
			button.closest(".box-user").classList.remove("add");

			const userId = button.getAttribute("btn-cancel-friend");

			socket.emit("CLIENT_CANCEL_FRIEND", userId);
		});
	});
}
// Hết Huỷ yêu cầu kb

// ------------------------------------

// Từ chối yêu cầu kb
const refuseFriend = (button) => {
	button.addEventListener("click", () => {
		button.closest(".box-user").classList.add("refuse");

		const userId = button.getAttribute("btn-refuse-friend");

		socket.emit("CLIENT_REFUSE_FRIEND", userId);
	});
};

const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
	listBtnRefuseFriend.forEach((button) => {
		refuseFriend(button);
	});
}
// Hết Từ chối yêu cầu kb

// ------------------------------------

// Chấp nhận yêu cầu kb
const acceptFriend = (button) => {
	button.addEventListener("click", () => {
		button.closest(".box-user").classList.add("accepted");

		const userId = button.getAttribute("btn-accept-friend");

		socket.emit("CLIENT_ACCEPT_FRIEND", userId);
	});
}

const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
	listBtnAcceptFriend.forEach((button) => {
		acceptFriend(button);
	});
}
// Hết Chấp nhận yêu cầu kb

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept]");
if(badgeUsersAccept){
	const userId = badgeUsersAccept.getAttribute("badge-users-accept");
	socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
		if(userId === data.userId){
			badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
		}
	});
}

// End SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
	
	// Trang lời mời đã nhận
	const dataUsersAccept = document.querySelector("[data-users-accept]");
	if(dataUsersAccept) {
		const userId = dataUsersAccept.getAttribute("data-users-accept");
		if(userId === data.userId){
			// Vẽ user ra giao diện
			const div = document.createElement("div");
			div.classList.add("col-6");
			div.setAttribute("user-id", data.infoUserA._id);

			div.innerHTML = `
				<div class="box-user">
					<div class="inner-avatar">
						<img src="/images/avatar.jpeg" alt="${data.infoUserA.fullName}">
					</div>
					<div class="inner-info">
						<div class="inner-name">
							${data.infoUserA.fullName}
						</div>
						<div class="inner-buttons">
							<button class="btn btn-sm btn-primary me-1" btn-accept-friend="${data.infoUserA._id}">
								Chấp nhận
							</button>
							<button class="btn btn-sm btn-secondary me-1" btn-refuse-friend="${data.infoUserA._id}">
								Xoá
							</button>
							<button class="btn btn-sm btn-secondary me-1" btn-deleted-friend="${data.infoUserA._id}" disabled="">
								Đã xoá
							</button>
							<button class="btn btn-sm btn-primary me-1" btn-accepted-friend="" disabled="">
								Đã chấp nhận
							</button>
						</div>
					</div>
				</div>
			`;

			dataUsersAccept.appendChild(div);

			// Huỷ lời mời kết bạn
			const buttonRefuse = div.querySelector("[btn-refuse-friend]")
			refuseFriend(buttonRefuse);

			// Chấp nhận lời mời kết bạn
			const buttonAccept = div.querySelector("[btn-accept-friend]")
			acceptFriend(buttonAccept);
		}
	}

	// Trang danh sách người dùng
	const dataUsersNotFriend = document.querySelector("[data-users-not-friend]");
	if(dataUsersNotFriend) {
		const userId = dataUsersNotFriend.getAttribute("data-users-not-friend");
		if(userId === data.userId) {
			const boxUserRemove = dataUsersNotFriend.querySelector(`[user-id='${data.infoUserA._id}']`);
			if(boxUserRemove) {
				dataUsersNotFriend.removeChild(boxUserRemove);
			}
		}
	}
});

	
// End SERVER_RETURN_INFO_ACCEPT_FRIEND

// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
	const boxUserRemove = document.querySelector(`[user-id='${data.userIdA}']`);
	if(boxUserRemove) {
		const dataUsersAccept = document.querySelector("[data-users-accept]");
		const userIdB = badgeUsersAccept.getAttribute("badge-users-accept");
		if(userIdB === data.userIdB){
			dataUsersAccept.removeChild(boxUserRemove);
		}
	}
});
// End SERVER_RETURN_USER_ID_CANCEL_FRIEND

// SERVER_RETURN_USER_STATUS_ONLINE

socket.on("SERVER_RETURN_USER_STATUS_ONLINE", (data) => {
	const dataUsersFriend = document.querySelector("[data-users-friend]");
	if(dataUsersFriend) {
		const boxUser = dataUsersFriend.querySelector(`[user-id='${data.userId}']`);	
		if(boxUser) {
			const boxStatus = boxUser.querySelector("[status]");
			boxStatus.setAttribute("status", data.status);
		}
	}
});

// End SERVER_RETURN_USER_STATUS_ONLINE
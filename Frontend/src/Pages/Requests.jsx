import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequests, handleExchangeRequest } from "../features/Exchange/exchangeSlice.js";
import { getRequests, respondToRequest } from "../features/Invite/inviteSlice.js";

function RequestCard({ title, message, type, onAccept, onDecline }) {
    const typeStyles = {
        collab: "bg-blue-100 text-blue-700 border-blue-500",
        service: "bg-green-100 text-green-700 border-green-500",
    };

    return (
        <div
            className={`border rounded-lg p-4 shadow-md ${
                type === "collab" ? typeStyles.collab : typeStyles.service
            }`}
        >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm">{message}</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={onAccept}
                    className={`py-2 px-4 rounded-lg font-medium ${
                        type === "collab"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                    Accept
                </button>
                <button
                    onClick={onDecline}
                    className="py-2 px-4 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600"
                >
                    Decline
                </button>
            </div>
        </div>
    );
}

function Requests() {
    const dispatch = useDispatch();

    // Fetch collab and service exchange requests from the store
    const { collabRequests, serviceRequests, isLoading, error } = useSelector(
        (state) => ({
            collabRequests: state.invite.requests, // Update based on your state slice
            serviceRequests: state.exchanges.userRequests, // Update based on your state slice
            isLoading: state.invite.isLoading || state.exchanges.isLoading,
            error: state.invite.error || state.exchanges.error,
        })
    );

    useEffect(() => {
        // Dispatch actions to fetch requests
        dispatch(getRequests());
        dispatch(getUserRequests());
    }, [dispatch]);

    const handleAccept = (id, type) => {
        const payload = { requestId: id, status: "accepted" };

        if (type === "service") {
            dispatch(handleExchangeRequest(payload))
                .unwrap()
                .then(() => {
                    alert(`Accepted service exchange request with ID: ${id}`);
                    dispatch(getUserRequests()); // Refresh service requests
                })
                .catch((err) => console.error("Error accepting request:", err));
        } else {
            dispatch(respondToRequest(payload))
                .unwrap()
                .then(() => {
                    alert(`Accepted collab request with ID: ${id}`);
                    dispatch(getRequests()); // Refresh collab requests
                })
                .catch((err) => console.error("Error accepting request:", err));
        }
    };

    const handleDecline = (id, type) => {
        const payload = { requestId: id, status: "declined" };

        if (type === "service") {
            dispatch(handleExchangeRequest(payload))
                .unwrap()
                .then(() => {
                    alert(`Declined service exchange request with ID: ${id}`);
                    dispatch(getUserRequests()); // Refresh service requests
                })
                .catch((err) => console.error("Error declining request:", err));
        } else {
            dispatch(respondToRequest(payload))
                .unwrap()
                .then(() => {
                    alert(`Declined collab request with ID: ${id}`);
                    dispatch(getRequests()); // Refresh collab requests
                })
                .catch((err) => console.error("Error declining request:", err));
        }
    };

    // Filter out already accepted requests
    const filteredCollabRequests = collabRequests?.filter(request => request.status !== "accepted");
    const filteredServiceRequests = serviceRequests?.filter(request => request.status !== "accepted");

    console.log(filteredServiceRequests)
    console.log(filteredCollabRequests)

    if (isLoading) {
        return <div className="text-center mt-6">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-6 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Requests Overview
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCollabRequests?.map((request) => (
                    <RequestCard
                        key={request._id}
                        title={request.invitationId.collab.name || "Collab Request"}
                        message={request.invitationId.message || "No description"}
                        type="collab"
                        onAccept={() => handleAccept(request._id, "collab")}
                        onDecline={() => handleDecline(request._id, "collab")}
                    />
                ))}
                {filteredServiceRequests?.map((request) => (
                    <RequestCard
                        key={request._id}
                        title={request.requesterSkills?.join(", ") || "Service Exchange Request"}
                        message={`Requested Exchange Type: ${request.exchangeType}, Skills: ${request.requesterSkills?.join(", ")}`}
                        type="service"
                        onAccept={() => handleAccept(request._id, "service")}
                        onDecline={() => handleDecline(request._id, "service")}
                    />

                ))}
            </div>
        </div>
    );
}

export default Requests;

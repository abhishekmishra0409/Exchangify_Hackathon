import React from 'react';

const Profile = () => {
    return (
        <div style={styles.container}>
            <h2 className="text-center font-bold text-xl">Your Profile</h2>
            <div style={styles.profileCard}>
                <div
                    style={styles.leftPanel}
                    className="flex flex-col items-center justify-center"
                >
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Student"
                        style={styles.image}
                    />
                    <h3 style={styles.studentName}>Ishmam Ahasan Samin</h3>
                    <p>Web Developer</p>
                </div>
                <div style={styles.rightPanel}>
                    <div style={styles.infoSection}>
                        <h3 style={styles.sectionTitle}>General Information</h3>
                        <table style={styles.infoTable}>
                            <tbody>
                            <tr>
                                <td>Phone</td>
                                <td>: 125</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>: 2020</td>
                            </tr>
                            <tr>
                                <td>Skills</td>
                                <td>: Male</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={styles.infoSection}>
                        <h3 style={styles.sectionTitle}>Other Information</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h2
                    style={styles.sectionTitle}
                    className="mt-10 text-2xl font-bold"
                >
                    Your Posts
                </h2>
                <div
                    style={styles.postsGrid}
                    className="flex flex-wrap gap-4"
                >
                    {[1, 2, 3, 4].map((post, index) => (
                        <div
                            key={index}
                            style={styles.postCard}
                            className="flex flex-col items-center justify-center pt-4"
                        >
                            <img
                                src="https://via.placeholder.com/300x200"
                                alt={`Post ${index + 1}`}
                                style={styles.postImage}
                            />
                            <div
                                style={styles.postContent}
                                className="p-4"
                            >
                                <h3
                                    style={styles.postTitle}
                                    className="text-lg font-semibold"
                                >
                                    Post Title {index + 1}
                                </h3>
                                <p
                                    style={styles.postDescription}
                                    className="text-sm text-gray-500"
                                >
                                    Short description of the post content goes here...
                                </p>
                                <span
                                    style={styles.postDate}
                                    className="text-xs text-gray-500"
                                >
                                    Posted on: 01/01/2024
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to right, #CDF1FF, #ECE9FF)',
        padding: '20px',
        borderRadius: '10px',
        margin: 'auto',
    },
    profileCard: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginTop: '20px',
    },
    leftPanel: {
        flex: '1',
        textAlign: 'center',
        borderRight: '1px solid #eee',
        padding: '20px',
    },
    rightPanel: {
        flex: '2',
        padding: '20px',
    },
    image: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '10px',
    },
    studentName: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    infoSection: {
        marginBottom: '20px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    infoTable: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    postCard: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
    },
};

export default Profile;

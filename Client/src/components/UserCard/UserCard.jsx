import LazyImage from "../../../utils/LazyImage";

export default function UserCard({ user }) {
    return (
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 4, borderRadius: 10, boxShadow: "0px 0px 2px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LazyImage
                    src={user.imageURL}
                    alt="用户头像"
                    width="60px"
                    height="60px"
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 12, fontSize: 12 }}>{user.username}</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: 12 }}>{user.address}</div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: 12 }}>
                {user.phoneNumber}
            </div>
        </div>
    );
}
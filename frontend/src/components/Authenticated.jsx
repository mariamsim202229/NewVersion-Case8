export function Authenticated({user}) {
    return (
        <>
            {user?.id !== 0 &&
                <div id="authenticated">{user.name}</div>
            }
        </>
    )
}
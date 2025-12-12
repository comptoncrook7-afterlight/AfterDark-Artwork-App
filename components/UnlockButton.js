export default function UnlockButton({ image }) {
function buy() {
alert('Stripe unlock flow would begin for image id: ' + image.id);
}
return (
<button onClick={buy} style={{marginTop:8}}>Unlock</button>
);
}

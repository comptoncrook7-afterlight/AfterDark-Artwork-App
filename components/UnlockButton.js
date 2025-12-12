export default function UnlockButton({ image }) {
// Placeholder - integrate Stripe checkout server-side later
function buy() {
alert('This would start the Stripe checkout flow for image id: ' + image.id);
}
return <button onClick={buy} style={{marginTop:8}}>Unlock</button>
}
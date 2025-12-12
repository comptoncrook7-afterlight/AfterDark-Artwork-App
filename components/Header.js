import Link from 'next/link';

export default function Header() {
return (
<header style={{padding:20, borderBottom:'1px solid #ddd', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
<div>
<Link href="/"><a style={{textDecoration:'none', color:'#111'}}><strong>AfterDark ArtWork</strong></a></Link>
</div>
<nav>
<Link href="/login"><a style={{marginRight:12}}>Login</a></Link>
<Link href="/admin"><a>Admin</a></Link>
</nav>
</header>
);
}
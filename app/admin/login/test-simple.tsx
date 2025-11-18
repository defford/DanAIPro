export default function TestSimple() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Simple Test Page</h1>
      <p>If you see this, the route is working</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  );
}


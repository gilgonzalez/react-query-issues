import { FC } from "react";
import { Outlet } from "react-router";
import { Link, useLocation } from "react-router-dom";

const WHEREIAM = {
	List: "/issues/list",
	ListInfinite: "/issues/listinfinity",
};

export const GitApp: FC = () => {
	const { pathname } = useLocation();

	return (
		<div className="container mt-3">
			<h1>
				Git Issues <small>Seguimiento de problemas</small>{" "}
			</h1>
			{pathname === WHEREIAM.List && (
				<button className="btn btn-danger btn-sm p-2" type="button">
					<Link
						style={{
							textDecoration: "none",
							color: "white",
							fontWeight: "bold",
						}}
						to={"/issues/listinfinity"}
					>
						Ir a Vista Scroll Infinito
					</Link>
				</button>
			)}
			{pathname === WHEREIAM.ListInfinite && (
				<button className="btn btn-primary btn-sm p-2" type="button">
					<Link
						style={{
							textDecoration: "none",
							color: "white",
							fontWeight: "bold",
						}}
						to={"/issues/list"}
					>
						Ir a Vista Paginada
					</Link>
				</button>
			)}
			<Outlet />
		</div>
	);
};

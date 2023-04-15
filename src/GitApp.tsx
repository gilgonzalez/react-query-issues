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
				<Link to={"/issues/listinfinity"}>Ir a Vista Scroll Infinito</Link>
			)}
			{pathname === WHEREIAM.ListInfinite && (
				<Link to={"/issues/list"}>Ir a Vista Paginada</Link>
			)}
			<Outlet />
		</div>
	);
};

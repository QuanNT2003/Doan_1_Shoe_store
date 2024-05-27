import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '~/components/List';
import { ImportItem } from '~/components/Item';
import * as ImportServices from '~/apiServices/importServices';
import { ToastContext } from '~/components/ToastContext';

function ImportList() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);

    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);

    const [day, setDay] = useState(new Date())
    // API PROPS
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');

    const onRowClicked = useCallback((row) => {
        navigate('/imports/detail/' + row.importId);
    }, []);
    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
    ) => {


        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
        };
    }

    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);

        getList(
            await createObjectQuery(
                pageNumber,
                limit,
                sortBy,
                orderBy,
            )
        );
        setDay(new Date())

    }

    const handlePerRowsChange = async (newPerPage, pageNumber) => {
        setPage(pageNumber);
        setLimit(newPerPage);

        getList(
            await createObjectQuery(
                pageNumber,
                newPerPage,
                sortBy,
                orderBy,
            )
        );
        setDay(new Date())

    }

    const handleSort = async (column, sortDirection) => {
        setSortBy(column.text);
        setOrderBy(sortDirection);
        setPage(1);
        console.log('handleSort');
        getList(
            await createObjectQuery(
                1,
                limit,
                column.text,
                sortDirection,
            )
        );

    };
    const getList = async (obj) => {
        setPending(true);

        const response = await ImportServices.getAllImports(obj)
            .catch((error) => {
                setPending(false);

                if (error?.response?.status === 404) {
                    setRows([]);
                    setTotalRows(0);
                } else {
                    toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            console.log(response);
            setPending(false);
            setRows(response.data);
            setTotalRows(response.total);

        }
    }


    useEffect(() => {
        const fetch = async () => {
            getList(
                await createObjectQuery(
                    page,
                    limit,
                    sortBy,
                    orderBy,

                ));
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

    }, [day]);
    return (
        <div>
            <div className='frame'>
                <List
                    // TABLE
                    pagination
                    onRowClicked={onRowClicked}
                    itemComponent={ImportItem}
                    data={rows}
                    pending={pending}


                    // PAGINATION
                    totalRows={totalRows}
                    handlePerRowsChange={handlePerRowsChange}
                    handlePageChange={handlePageChange}
                    // SORT
                    handleSort={handleSort}
                />
            </div>
        </div>
    );
}

export default ImportList;
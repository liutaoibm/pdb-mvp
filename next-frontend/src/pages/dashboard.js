import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { DataSet, Network } from 'vis-network/standalone';
import './dashboard.css';

const Dashboard = () => {
    const networkContainerRef = useRef(null);

    useEffect(() => {
        const nodes = new DataSet([
            { id: 1, label: 'Sapphire', shape: 'dot', color: '#00C0EF' },
            { id: 2, label: 'Wellness Report', shape: 'dot', color: '#F39C12' },
            { id: 3, label: 'Wellness Assistance', shape: 'dot', color: '#E74C3C' },
            { id: 4, label: 'Wellness Info', shape: 'dot', color: '#3498DB' },
            { id: 5, label: 'Customer Onboarding', shape: 'dot', color: '#5BC0DE' },
            { id: 6, label: 'Recommendations', shape: 'dot', color: '#95A5A6' },
            { id: 7, label: 'Product Sentiment', shape: 'dot', color: '#E67E22' }
        ]);

        const edges = new DataSet([
            { from: 1, to: 2, label: 'HAS SYSTEM' },
            { from: 1, to: 3, label: 'HAS SYSTEM' },
            { from: 1, to: 4, label: 'HAS SYSTEM' },
            { from: 1, to: 5, label: 'HAS SYSTEM' },
            { from: 3, to: 4, label: 'REALIZED BY SERVICE' },
            { from: 1, to: 6, label: 'HAS SYSTEM' },
            { from: 6, to: 7, label: 'SUBSYSTEM OF' }
        ]);

        const data = {
            nodes: nodes,
            edges: edges
        };

        const options = {
            nodes: {
                shape: 'dot',
                size: 16,
                font: {
                    size: 14,
                    color: '#000000'
                },
                borderWidth: 2
            },
            edges: {
                width: 2,
                length: 200,
                color: '#848484',
                font: {
                    size: 12,
                    align: 'top'
                },
                arrows: {
                    to: { enabled: true, scaleFactor: 0.5 }
                },
                smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.7 }
            },
            layout: {
                improvedLayout: true,
                hierarchical: {
                    enabled: false,
                    levelSeparation: 150,
                    nodeSpacing: 100,
                    treeSpacing: 200,
                    blockShifting: true,
                    edgeMinimization: true,
                    parentCentralization: true,
                    direction: 'UD', // UD, DU, LR, RL
                    sortMethod: 'hubsize' // hubsize, directed
                }
            },
            interaction: {
                hover: true,
                tooltipDelay: 200,
                hideEdgesOnDrag: true,
                hideNodesOnDrag: false
            }
        };

        const network = new Network(networkContainerRef.current, data, options);

        return () => {
            network.destroy();
        };
    }, []);

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1>IBM Product Builder</h1>
                <div className="user-info">
                    <p>Welcome Stephen Williams</p>
                </div>
            </div>
            <div className="main-content">
                <div className="sidebar">
                    <Link href="/define-product">
                        <button className="btn-create-product">Create / Define a new product</button>
                    </Link>
                    <nav>
                        <ul>
                            <li>Define a new product</li>
                            <li>Build / Scaffold Product</li>
                            <li>Product Repository</li>
                            <li>Product Building Blocks</li>
                            <li>Quick Help</li>
                        </ul>
                    </nav>
                </div>
                <div className="content">
                    <div className="dashboard-header">
                        <button className="repository-button">My Products</button>
                        <button className="repository-button active">Repository</button>
                        <div className="search-bar">
                            <input type="text" placeholder="Wellness" />
                            <button className="search-bar-button">X</button>
                        </div>
                    </div>
                    <div className="dashboard-main">
                        <div className="product-list">
                            <div className="search-result">
                                <p>Sapphire Wellness</p>
                                <ul>
                                    <li>Gold Wellness</li>
                                    <li>Silver Wellness</li>
                                </ul>
                            </div>
                        </div>
                        <div className="graph-container" ref={networkContainerRef}></div>
                    </div>
                    <div className="bill-of-materials">
                        <h3>Bill of Material</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>System</th>
                                    <th>Service</th>
                                    <th>API</th>
                                    <th>Resource</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sapphire Wellness</td>
                                    <td>Health & Wellness Customer On-boarding</td>
                                    <td>
                                        <ul>
                                            <li>User Registration Service</li>
                                            <li>Service 12</li>
                                        </ul>
                                    </td>
                                    <td>180</td>
                                    <td>Document DB</td>
                                </tr>
                                <tr>
                                    <td>Sapphire Wellness</td>
                                    <td>Health & Wellness Data Collection</td>
                                    <td>
                                        <ul>
                                          <li>Service 21</li>
                                          <li>Service 22</li>
                                          <li>Service 23</li>
                                        </ul>
                                    </td>
                                    <td>185</td>
                                    <td>Document DB</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

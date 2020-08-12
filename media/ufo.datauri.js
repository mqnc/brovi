
// this is the same as the ufo.dae file, just encoded so it can be loaded from a string

ufosrc = "data:;base64," + btoa(`<?xml version="1.0" encoding="utf-8"?>
<COLLADA xmlns="http://www.collada.org/2005/11/COLLADASchema" version="1.4.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <asset>
    <contributor>
      <author>Blender User</author>
      <authoring_tool>Blender 2.80.75 commit date:2019-07-29, commit time:14:47, hash:f6cb5f54494e</authoring_tool>
    </contributor>
    <created>2019-09-27T17:24:11</created>
    <modified>2019-09-27T17:24:11</modified>
    <unit name="meter" meter="1"/>
    <up_axis>Z_UP</up_axis>
  </asset>
  <library_effects>
    <effect id="Material_002-effect">
      <profile_COMMON>
        <technique sid="common">
          <lambert>
            <emission>
              <color sid="emission">0 0 0 1</color>
            </emission>
            <diffuse>
              <color sid="diffuse">0.5 0 1 1</color>
            </diffuse>
            <reflectivity>
              <float sid="specular">0.5</float>
            </reflectivity>
          </lambert>
        </technique>
      </profile_COMMON>
    </effect>
    <effect id="Material_001-effect">
      <profile_COMMON>
        <technique sid="common">
          <lambert>
            <emission>
              <color sid="emission">0 0 0 1</color>
            </emission>
            <diffuse>
              <color sid="diffuse">0.7 0.9 1 1</color>
            </diffuse>
            <reflectivity>
              <float sid="specular">0.5</float>
            </reflectivity>
          </lambert>
        </technique>
      </profile_COMMON>
    </effect>
  </library_effects>
  <library_images/>
  <library_materials>
    <material id="Material_002-material" name="Material.002">
      <instance_effect url="#Material_002-effect"/>
    </material>
    <material id="Material_001-material" name="Material.001">
      <instance_effect url="#Material_001-effect"/>
    </material>
  </library_materials>
  <library_geometries>
    <geometry id="Torus_001-mesh" name="Torus.001">
      <mesh>
        <source id="Torus_001-mesh-positions">
          <float_array id="Torus_001-mesh-positions-array" count="57">0.1980748 0.3990192 0.7554773 0.2801201 0.5642984 0.31 0.4082188 0.1783463 0.7554773 0.5773085 0.2522199 0.31 0.4273526 -0.1257767 0.7554773 0.6043679 -0.1778751 0.31 0.2465233 -0.3710475 0.7554773 0.3486368 -0.5247404 0.31 0 0 0.94 -0.0496568 -0.442701 0.7554773 -0.07022529 -0.6260739 0.31 -0.322602 -0.3072099 0.7554773 -0.4562281 -0.4344604 0.31 -0.4445981 -0.0279718 0.7554773 -0.6287567 -0.03955817 0.31 -0.3585618 0.2643545 0.7554773 -0.5070831 0.3738536 0.31 -0.1047505 0.4329864 0.7554773 -0.1481396 0.6123352 0.31</float_array>
          <technique_common>
            <accessor source="#Torus_001-mesh-positions-array" count="19" stride="3">
              <param name="X" type="float"/>
              <param name="Y" type="float"/>
              <param name="Z" type="float"/>
            </accessor>
          </technique_common>
        </source>
        <source id="Torus_001-mesh-normals">
          <float_array id="Torus_001-mesh-normals-array" count="81">0.04496079 0.4008358 0.915046 0.103877 0.9260886 0.362725 0.2920947 0.2781576 0.915046 0.674853 0.6426538 0.3627251 0.4025534 0.02532649 0.9150461 0.9300573 0.05851423 0.3627252 0.3246536 -0.2393552 0.915046 0.7500776 -0.5530046 0.3627251 0.09484428 -0.3920401 0.915046 0.2191282 -0.9057667 0.3627253 -0.1793435 -0.3612849 0.915046 -0.4143539 -0.8347102 0.3627253 -0.3696143 -0.1614806 0.9150461 -0.853955 -0.3730835 0.3627251 -0.8939812 0.2631128 0.362725 -0.386939 0.1138822 0.9150459 -0.5157037 0.776196 0.3627249 -0.2232103 0.3359584 0.915046 0.103877 0.9260886 0.3627251 0.674853 0.6426538 0.3627252 0.9300574 0.05851417 0.3627252 0.7500774 -0.5530049 0.3627252 0.219128 -0.9057668 0.3627253 -0.4143536 -0.8347105 0.362725 -0.8539548 -0.373084 0.3627251 -0.8939811 0.2631127 0.3627251 -0.5157035 0.7761962 0.3627251</float_array>
          <technique_common>
            <accessor source="#Torus_001-mesh-normals-array" count="27" stride="3">
              <param name="X" type="float"/>
              <param name="Y" type="float"/>
              <param name="Z" type="float"/>
            </accessor>
          </technique_common>
        </source>
        <source id="Torus_001-mesh-map-0">
          <float_array id="Torus_001-mesh-map-0-array" count="162">0.6666666 0.7500001 0.6111111 1 0.5555555 0.75 0.6666666 0.5 0.5555555 0.75 0.5555555 0.5 0.5555555 0.75 0.4999999 1 0.4444444 0.75 0.5555555 0.75 0.4444444 0.5 0.5555555 0.5 0.4444444 0.75 0.3888888 1 0.3333333 0.75 0.4444444 0.75 0.3333333 0.5 0.4444444 0.5 0.3333333 0.75 0.2777777 1 0.2222222 0.75 0.3333333 0.75 0.2222222 0.5 0.3333333 0.5 0.2222222 0.75 0.1666666 1 0.1111111 0.75 0.2222222 0.75 0.1111111 0.5 0.2222222 0.5 0.1111111 0.75 0.05555552 1 0 0.7500001 0.1111111 0.75 0 0.5 0.1111111 0.5 1 0.7500001 0.9444445 1 0.8888888 0.7500001 1 0.7500001 0.8888888 0.5 1 0.5 0.8888888 0.7500001 0.7777778 0.5 0.8888888 0.5 0.8888888 0.7500001 0.8333334 1 0.7777778 0.7500001 0.7777778 0.7500001 0.6666666 0.5 0.7777778 0.5 0.7777778 0.7500001 0.7222222 1 0.6666666 0.7500001 0.6666666 0.5 0.6666666 0.7500001 0.5555555 0.75 0.5555555 0.75 0.4444444 0.75 0.4444444 0.5 0.4444444 0.75 0.3333333 0.75 0.3333333 0.5 0.3333333 0.75 0.2222222 0.75 0.2222222 0.5 0.2222222 0.75 0.1111111 0.75 0.1111111 0.5 0.1111111 0.75 0 0.7500001 0 0.5 1 0.7500001 0.8888888 0.7500001 0.8888888 0.5 0.8888888 0.7500001 0.7777778 0.7500001 0.7777778 0.5 0.7777778 0.7500001 0.6666666 0.7500001 0.6666666 0.5</float_array>
          <technique_common>
            <accessor source="#Torus_001-mesh-map-0-array" count="81" stride="2">
              <param name="S" type="float"/>
              <param name="T" type="float"/>
            </accessor>
          </technique_common>
        </source>
        <vertices id="Torus_001-mesh-vertices">
          <input semantic="POSITION" source="#Torus_001-mesh-positions"/>
        </vertices>
        <triangles material="Material_002-material" count="27">
          <input semantic="VERTEX" source="#Torus_001-mesh-vertices" offset="0"/>
          <input semantic="NORMAL" source="#Torus_001-mesh-normals" offset="1"/>
          <input semantic="TEXCOORD" source="#Torus_001-mesh-map-0" offset="2" set="0"/>
          <p>17 0 0 8 0 1 0 0 2 18 1 3 0 1 4 1 1 5 0 2 6 8 2 7 2 2 8 0 3 9 3 3 10 1 3 11 2 4 12 8 4 13 4 4 14 2 5 15 5 5 16 3 5 17 4 6 18 8 6 19 6 6 20 4 7 21 7 7 22 5 7 23 6 8 24 8 8 25 9 8 26 6 9 27 10 9 28 7 9 29 9 10 30 8 10 31 11 10 32 9 11 33 12 11 34 10 11 35 11 12 36 8 12 37 13 12 38 11 13 39 14 13 40 12 13 41 13 14 42 16 14 43 14 14 44 13 15 45 8 15 46 15 15 47 15 16 48 18 16 49 16 16 50 15 17 51 8 17 52 17 17 53 18 18 54 17 18 55 0 18 56 0 19 57 2 19 58 3 19 59 2 20 60 4 20 61 5 20 62 4 21 63 6 21 64 7 21 65 6 22 66 9 22 67 10 22 68 9 23 69 11 23 70 12 23 71 11 24 72 13 24 73 14 24 74 13 25 75 15 25 76 16 25 77 15 26 78 17 26 79 18 26 80</p>
        </triangles>
      </mesh>
    </geometry>
    <geometry id="Torus-mesh" name="Torus">
      <mesh>
        <source id="Torus-mesh-positions">
          <float_array id="Torus-mesh-positions-array" count="81">1.46 0 0 1 0 0.46 1 0 -0.46 1.118425 0.9384701 0 0.7660444 0.6427877 0.46 0.7660444 0.6427877 -0.46 0.2535264 1.437819 0 0.1736482 0.9848077 0.46 0.1736482 0.9848077 -0.46 -0.7299998 1.264397 0 -0.4999998 0.8660255 0.46 -0.4999998 0.8660255 -0.46 -1.371951 0.4993498 0 -0.9396925 0.3420205 0.46 -0.9396925 0.3420205 -0.46 -1.371951 -0.4993492 0 -0.9396927 -0.34202 0.46 -0.9396927 -0.34202 -0.46 -0.7299998 -1.264397 0 -0.4999998 -0.8660255 0.46 -0.4999998 -0.8660255 -0.46 0.2535264 -1.437819 0 0.1736482 -0.9848077 0.46 0.1736482 -0.9848077 -0.46 1.118425 -0.9384701 0 0.7660444 -0.6427877 0.46 0.7660444 -0.6427877 -0.46</float_array>
          <technique_common>
            <accessor source="#Torus-mesh-positions-array" count="27" stride="3">
              <param name="X" type="float"/>
              <param name="Y" type="float"/>
              <param name="Z" type="float"/>
            </accessor>
          </technique_common>
        </source>
        <source id="Torus-mesh-normals">
          <float_array id="Torus-mesh-normals-array" count="144">0.6847911 0.2492436 0.6847912 0.684791 0.2492437 -0.6847912 0.3643696 0.6311068 0.6847912 0.3643696 0.6311068 -0.6847912 -0.1265442 0.7176682 0.6847912 -0.1265441 0.717668 -0.6847913 -0.5582467 0.4684248 0.6847912 -0.5582467 0.4684248 -0.6847912 -0.7287394 1.89099e-7 0.6847912 -0.7287394 2.76085e-7 -0.6847912 -0.5582469 -0.4684249 0.684791 -0.5582469 -0.4684249 -0.684791 -0.1265442 -0.7176682 0.6847912 -0.1265441 -0.7176681 -0.6847914 0.3643697 -0.6311069 0.6847911 0 0 -1 0.3643697 -0.6311069 -0.6847911 0.684791 -0.2492436 0.6847911 0 0 1 0.684791 -0.2492437 -0.6847911 0.684791 0.2492437 0.6847911 0.684791 0.2492436 -0.6847911 0.3643697 0.6311069 0.6847911 0.3643697 0.6311069 -0.6847911 -0.1265441 0.7176681 0.6847913 -0.1265442 0.7176682 -0.6847912 -0.5582466 0.4684248 0.6847912 -0.5582467 0.4684249 -0.6847912 -0.7287395 2.76085e-7 0.6847912 -0.7287395 1.89099e-7 -0.6847912 -0.5582467 -0.4684246 0.6847912 -0.5582467 -0.4684246 -0.6847912 -0.1265441 -0.717668 0.6847913 -0.1265442 -0.7176682 -0.6847912 0.3643696 -0.6311068 0.6847912 1.98175e-7 0 -1 1.56531e-7 0 -1 0 0 -1 0 0 -1 0 0 -1 0.3643696 -0.6311068 -0.6847912 0.684791 -0.2492437 0.6847912 1.98175e-7 0 1 1.56531e-7 0 1 0 0 1 0 0 1 0 0 1 0.6847911 -0.2492436 -0.6847912</float_array>
          <technique_common>
            <accessor source="#Torus-mesh-normals-array" count="48" stride="3">
              <param name="X" type="float"/>
              <param name="Y" type="float"/>
              <param name="Z" type="float"/>
            </accessor>
          </technique_common>
        </source>
        <source id="Torus-mesh-map-0">
          <float_array id="Torus-mesh-map-0-array" count="300">0.6666667 0.5 0.5555556 0.75 0.5555556 0.5 0.6666667 0.25 0.5555556 0.5 0.5555556 0.25 0.6666667 0.5 0.7777778 0.75 0.6666667 0.75 0.7777778 0.25 0.6666667 0.5 0.6666667 0.25 0.8888889 0.5 0.7777778 0.75 0.7777778 0.5 0.8888889 0.25 0.7777778 0.5 0.7777778 0.25 1 0.5 0.8888889 0.75 0.8888889 0.5 0.8888889 0.25 1 0.5 0.8888889 0.5 0.1111111 0.5 0 0.75 0 0.5 0.1111111 0.25 0 0.5 0 0.25 0.1111111 0.5 0.2222222 0.75 0.1111111 0.75 0.2222222 0.25 0.1111111 0.5 0.1111111 0.25 0.3333333 0.5 0.2222222 0.75 0.2222222 0.5 0.3333333 0.25 0.2222222 0.5 0.2222222 0.25 0.4444444 0.5 0.3333333 0.75 0.3333333 0.5 0.4444444 0.25 0 0.25 0.7777778 0.25 0.3333333 0.25 0.4444444 0.5 0.3333333 0.5 0.5555556 0.5 0.4444444 0.75 0.4444444 0.5 0.6666667 0.75 0.8888889 0.75 0.1111111 0.75 0.5555556 0.25 0.4444444 0.5 0.4444444 0.25 0.6666667 0.5 0.6666667 0.75 0.5555556 0.75 0.6666667 0.25 0.6666667 0.5 0.5555556 0.5 0.6666667 0.5 0.7777778 0.5 0.7777778 0.75 0.7777778 0.25 0.7777778 0.5 0.6666667 0.5 0.8888889 0.5 0.8888889 0.75 0.7777778 0.75 0.8888889 0.25 0.8888889 0.5 0.7777778 0.5 1 0.5 1 0.75 0.8888889 0.75 0.8888889 0.25 1 0.25 1 0.5 0.1111111 0.5 0.1111111 0.75 0 0.75 0.1111111 0.25 0.1111111 0.5 0 0.5 0.1111111 0.5 0.2222222 0.5 0.2222222 0.75 0.2222222 0.25 0.2222222 0.5 0.1111111 0.5 0.3333333 0.5 0.3333333 0.75 0.2222222 0.75 0.3333333 0.25 0.3333333 0.5 0.2222222 0.5 0.4444444 0.5 0.4444444 0.75 0.3333333 0.75 0.6666667 0.25 0.5555556 0.25 0.7777778 0.25 0.5555556 0.25 0.4444444 0.25 0.7777778 0.25 0.4444444 0.25 0.3333333 0.25 0.2222222 0.25 0.2222222 0.25 0.1111111 0.25 0 0.25 0 0.25 0.8888889 0.25 0.7777778 0.25 0.4444444 0.25 0.2222222 0.25 0 0.25 0.3333333 0.25 0.4444444 0.25 0.4444444 0.5 0.5555556 0.5 0.5555556 0.75 0.4444444 0.75 0.4444444 0.75 0.5555556 0.75 0.3333333 0.75 0.5555556 0.75 0.6666667 0.75 0.3333333 0.75 0.6666667 0.75 0.7777778 0.75 0.8888889 0.75 0.8888889 0.75 0 0.75 0.1111111 0.75 0.1111111 0.75 0.2222222 0.75 0.6666667 0.75 0.2222222 0.75 0.3333333 0.75 0.6666667 0.75 0.5555556 0.25 0.5555556 0.5 0.4444444 0.5</float_array>
          <technique_common>
            <accessor source="#Torus-mesh-map-0-array" count="150" stride="2">
              <param name="S" type="float"/>
              <param name="T" type="float"/>
            </accessor>
          </technique_common>
        </source>
        <vertices id="Torus-mesh-vertices">
          <input semantic="POSITION" source="#Torus-mesh-positions"/>
        </vertices>
        <triangles material="Material_001-material" count="50">
          <input semantic="VERTEX" source="#Torus-mesh-vertices" offset="0"/>
          <input semantic="NORMAL" source="#Torus-mesh-normals" offset="1"/>
          <input semantic="TEXCOORD" source="#Torus-mesh-map-0" offset="2" set="0"/>
          <p>3 0 0 1 0 1 0 0 2 5 1 3 0 1 4 2 1 5 3 2 6 7 2 7 4 2 8 8 3 9 3 3 10 5 3 11 9 4 12 7 4 13 6 4 14 11 5 15 6 5 16 8 5 17 12 6 18 10 6 19 9 6 20 11 7 21 12 7 22 9 7 23 15 8 24 13 8 25 12 8 26 17 9 27 12 9 28 14 9 29 15 10 30 19 10 31 16 10 32 20 11 33 15 11 34 17 11 35 21 12 36 19 12 37 18 12 38 23 13 39 18 13 40 20 13 41 24 14 42 22 14 43 21 14 44 26 15 45 14 15 46 8 15 47 23 16 48 24 16 49 21 16 50 0 17 51 25 17 52 24 17 53 4 18 54 10 18 55 16 18 56 2 19 57 24 19 58 26 19 59 3 20 60 4 20 61 1 20 62 5 21 63 3 21 64 0 21 65 3 22 66 6 22 67 7 22 68 8 23 69 6 23 70 3 23 71 9 24 72 10 24 73 7 24 74 11 25 75 9 25 76 6 25 77 12 26 78 13 26 79 10 26 80 11 27 81 14 27 82 12 27 83 15 28 84 16 28 85 13 28 86 17 29 87 15 29 88 12 29 89 15 30 90 18 30 91 19 30 92 20 31 93 18 31 94 15 31 95 21 32 96 22 32 97 19 32 98 23 33 99 21 33 100 18 33 101 24 34 102 25 34 103 22 34 104 5 35 105 2 35 106 8 35 107 2 36 108 26 36 109 8 36 110 26 37 111 23 37 112 20 37 113 20 38 114 17 38 115 14 38 116 14 39 117 11 39 118 8 39 119 26 38 120 20 38 121 14 38 122 23 40 123 26 40 124 24 40 125 0 41 126 1 41 127 25 41 128 25 42 129 1 42 130 22 42 131 1 43 132 4 43 133 22 43 134 4 44 135 7 44 136 10 44 137 10 18 138 13 18 139 16 18 140 16 45 141 19 45 142 4 45 143 19 46 144 22 46 145 4 46 146 2 47 147 0 47 148 24 47 149</p>
        </triangles>
      </mesh>
    </geometry>
  </library_geometries>
  <library_visual_scenes>
    <visual_scene id="Scene" name="Scene">
      <node id="cockpit" name="cockpit" type="NODE">
        <matrix sid="transform">1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1</matrix>
        <instance_geometry url="#Torus_001-mesh" name="cockpit">
          <bind_material>
            <technique_common>
              <instance_material symbol="Material_002-material" target="#Material_002-material">
                <bind_vertex_input semantic="UVMap" input_semantic="TEXCOORD" input_set="0"/>
              </instance_material>
            </technique_common>
          </bind_material>
        </instance_geometry>
      </node>
      <node id="ring" name="ring" type="NODE">
        <matrix sid="transform">1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1</matrix>
        <instance_geometry url="#Torus-mesh" name="ring">
          <bind_material>
            <technique_common>
              <instance_material symbol="Material_001-material" target="#Material_001-material">
                <bind_vertex_input semantic="UVMap" input_semantic="TEXCOORD" input_set="0"/>
              </instance_material>
            </technique_common>
          </bind_material>
        </instance_geometry>
      </node>
    </visual_scene>
  </library_visual_scenes>
  <scene>
    <instance_visual_scene url="#Scene"/>
  </scene>
</COLLADA>
`)
